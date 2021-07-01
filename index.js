const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const root = __dirname + "/";

app.use("/azbuka", express.static(root));

app.listen(port, () => {
  console.log(`Azbuka app listening at http://localhost:${port}`);
});
