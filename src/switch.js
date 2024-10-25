import Parser from "redis-parser";
import { store } from "./index.js";
import { GET, SET, DEL, EXPIRE } from "./key_value.js";
export const redis_parser= (connection) => {
  return new Parser({
    returnReply: (reply) => {
      const command = reply[0];
      switch (command) {
        case "ping":
          connection.write("+PONG\r\n");
          break;
        case "set" || "SET":
          SET(store, connection, reply);
          break;
        case "get" || "GET":
          GET(store, connection, reply);
          break;
        case "del" || "DEL":
          DEL(store, connection, reply);
          break;
        case "expire" || "EXPIRE":
         EXPIRE(store,connection,reply)
      }
    },

    returnError: (err) => {
      console.log(`=>`, err);
    },
  });
};
