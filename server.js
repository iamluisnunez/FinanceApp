import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Hello world");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
