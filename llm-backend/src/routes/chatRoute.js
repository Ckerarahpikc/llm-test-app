const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const modelMessage = await convertToModelMessages(messages);

    // generate the content using sdk syntax
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: modelMessage,
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (err) {
    res.status(500).json({ status: "Something went wrong." });
  }
});

module.exports = router;
