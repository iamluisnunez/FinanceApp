const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
// const cors = require("cors");
// app.use(cors());

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`We are listening on port number ${PORT}`);
});
app.use("/api", adminRoutes);
