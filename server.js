const express = require("express");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`We are listening on port number ${PORT}`);
});
app.use("/api", adminRoutes);
