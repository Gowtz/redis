import Parser from "redis-parser";
import { INCREMENTOR, STORE } from "./dataStore.js";
import { append, del, expire, get, set } from "./operation/keyValue.js";
import { decr, incr } from "./operation/incrementor.js";
export const redis_parser = (connection) => {
  return new Parser({
    returnReply: (reply) => {
      const command = reply[0];
      switch (command.toLowerCase()) {
        case "ping":
          connection.write("+PONG\r\n");
          break;
        case "set":
          set(STORE, connection, reply);
          break;
        case "get":
          get(STORE, connection, reply);
          break;
        case "del":
          del(STORE, connection, reply);
          break;
        case "expire":
          expire(STORE, connection, reply);
          break;
        case "append":
          append(STORE, connection, reply);
          break;
        case "incr":
          incr(INCREMENTOR,connection, reply);
          break;
        case "decr":
          decr(INCREMENTOR, connection, reply);
          break;
      }
    },

    returnError: (err) => {
      console.log(`=>`, err);
    },
  });
};
