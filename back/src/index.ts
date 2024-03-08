const app = require("./server");
const dotenv = require("dotenv").config();
const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})