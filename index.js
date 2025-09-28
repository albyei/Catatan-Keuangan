const http = require("http");
console.log("Hello via Node.js!");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Catatan Keuangan Server\n");
});
server.listen(3000, () => console.log("Server running on port 3000"));
