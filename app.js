require("dotenv").config();
const app = require("./api/index");

app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening on port ${process.env.NODE_PORT}!`);
});
