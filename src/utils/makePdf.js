import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import PDF from 'pdfkit-construct'
import { sendEmail } from '../utils/emailer.js';

export const printer = async (content, companyName, email) => {
  try {
    const date = new Date(Date.now());
    console.log('🚀 ~ file: makePdf.js:10 ~ printer ~ date:', date.toLocaleDateString())

    const fileName = `${companyName}${Date.now()}.pdf`
    const pathFile = resolve(dirname(fileURLToPath(import.meta.url)), `../assets/pdf/${fileName}`)
    // Create a document
    console.log("🚀 ~ file: makePdf.js:15 ~ printer ~ pathFile:", pathFile)
    const doc = new PDF();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(pathFile));

    // doc.text(100, 100, `Date ${date.toLocaleDateString()}`)
    doc.setDocumentHeader({}, () => {

      doc.lineJoin('miter')
        .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

      doc.fill("#000000")
        .fontSize(15)
        .text(`Date: ${date.toLocaleDateString()}`, doc.header.x, doc.header.y);
      doc.fill("#000000")
        .fontSize(15)
        .text(`Company: ${companyName}`, doc.header.x, doc.header.y + 15);
    });

    doc.addTable([
      { key: 'product', label: 'Product', align: 'left' },
      { key: 'total', label: 'Total', align: 'center' }
    ], content, {
      width: 'fill_body',
      striped: true,
      cellsPadding: 10,
      marginLeft: 45,
      marginRight: 45,
      headAlign: 'center'
    })

    doc.render()

    // Finalize PDF file
    doc.end()
    console.log('pdf is done');
    if (email) {
      console.log('Sending to email ', email);
      const timeOut = setTimeout(async () => {
        await sendEmail(email, companyName, pathFile)
      }, 6000);
    }

    return { status: 200, pathFile }
  } catch (error) {
    console.log('🚀 ~ file: makePdf.js:58 ~ printer ~ error:', error)
    return error
  }
} 