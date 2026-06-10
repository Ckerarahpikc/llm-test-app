require("dotenv").config();

const { prisma } = require("./db/index");
const app = require("./app");

// CONNECTION TO DB
const PORT = process.env.PORT || 2000;

prisma
  .$connect()
  .then(() => {
    console.log("> DB Connected Successfully.");

    // BOOTING THE EXPRESS SERVER
    app.listen(PORT, () => {
      console.log(`> Application running on http://localhost:${PORT}`);
    });
  })
  // CATCHING CONNECTION ERRORS ON STARTUP
  .catch((err) => {
    console.error("> Something went wrong:", err);
    process.exit(1);
  });
