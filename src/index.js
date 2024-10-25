import net from "net";
import { redis_parser } from "./switch.js";
const PORT = 8000;

const server = net.createServer((connection) => {
  console.log(`Client connected \n`);
  connection.write(`+OK\r\n`);
  connection.on("data", (data) => {
    const parser = redis_parser(connection)
    parser.execute(data);
  });
});

server.listen(PORT, () =>
  console.log(`Custom Redis server is running in port ${PORT}`),
);
