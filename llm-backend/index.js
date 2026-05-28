const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const fakeMessage = "New messsage jjs fo rteslkajdfj";

    res.status(200).json({ reply: fakeMessage });
  } catch (err) {
    res.status(500).json({ status: "Something went wrong." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`> ✅ App running on http://localhost:${PORT}`);
});
