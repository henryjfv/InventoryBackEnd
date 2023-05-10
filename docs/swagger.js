import YAML from "yamljs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const swaggerDocument = YAML.load(
  resolve(dirname(fileURLToPath(import.meta.url)), "../swagger.yaml")
);

const openApiConfig = swaggerDocument;

export default openApiConfig;
