const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
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
app.use("/users", userRoutes);
