import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import dbConnect from "./src/config/db.js";
import routes from "./src/routes/index.js";
import openApiConfig from "./docs/swagger.js";
import { VERSION_API, PORT } from "./src/utils/constants.js";

const port = PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use(`/api/${VERSION_API}`, routes);

app.listen(port, () => {
  console.log("Running in", `${port}`);
});

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(openApiConfig));
const pathIndex = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "./src/public/index.html"
);
app.get("/", (req, res) => {
  res.sendFile(pathIndex);
})
app.get("*", (req, res) => {
  res.status(404).redirect("/");
});

dbConnect();

export default app;
