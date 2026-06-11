import { defineConfig } from "prisma/config";

import { dataBaseUrlString } from "./src/utils/dataBaseUrlString.js";

export default defineConfig({
  // path to the schema inside the project
  schema: "prisma/schema.prisma",
  datasource: {
    url: dataBaseUrlString,
  },
});
