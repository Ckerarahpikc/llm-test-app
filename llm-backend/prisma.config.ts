import { defineConfig } from "prisma/config";

import { dataBaseUrlString } from "./src/utils/dataBaseUrlString.js";

export default defineConfig({
  // path to the schema inside the project
  schema: "prisma/schema.prisma",
  datasource: {
    url: dataBaseUrlString,
  },
});

// golden rules for me:
// if you changed the prisma.schema:
//  either run "npx prisma db push"
//  then "npx prisma generate"
//
//  or run "npx prisma migrate dev --user name_of_the_timestamp"
//  then "npx prisma generate"
//
// but if the posgresql changed:
//  run "npx prisma db pull"
//  then "npx prisma generate"
