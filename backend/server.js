const express = require("express");
const router = require("./routes/userRoutes");

const port = 5000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started in port: ${port}`);
});

app.use("/user", router);
