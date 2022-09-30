const { server } = require("./index");
const db = require("./Connection");

const PORT = 5000;

server.listen(PORT, () => {
  db();
  console.log("server running at port", PORT);
});
