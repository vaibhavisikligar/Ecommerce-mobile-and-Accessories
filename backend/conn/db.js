const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONN)
  .then(() => {
    console.log("connection successfully database.......");
  })
  .catch((error) => {
    console.log("not connection database", error);
  });
