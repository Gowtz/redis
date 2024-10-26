import Parser from "redis-parser";
import { append, del, expire, get, set } from "./operation/keyValue.js";
import { decr, incr } from "./operation/incrementor.js";
import { lpop, lpush, rpop, rpush } from "./operation/queue.js";
import { hget, hgetall, hset } from "./operation/hash.js";
export const redis_parser = (connection) => {
  return new Parser({
    returnReply: (reply) => {
      const command = reply[0];
      switch (command.toLowerCase()) {
        case "ping":
          connection.write("+PONG\r\n");
          break;
        case "set":
          set(connection, reply);
          break;
        case "get":
          get(connection, reply);
          break;
        case "del":
          del(connection, reply);
          break;
        case "expire":
          expire(connection, reply);
          break;
        case "append":
          append(connection, reply);
          break;
        case "incr":
          incr(connection, reply);
          break;
        case "decr":
          decr(connection, reply);
          break;
        case "lpush":
          lpush(connection, reply);
          break;
        case "lpop":
          lpop(connection, reply);
          break;
        case "rpush":
          rpush(connection, reply);
          break;
        case "rpop":
          rpop(connection, reply);
          break;
        case "hset":
          hset(connection, reply);
          break;
        case "hgetall":
          hgetall(connection, reply);
          break;
        case "hget":
          hget(connection, reply);
          break;
      }
    },

    returnError: (err) => {
      console.log(`=>`, err);
    },
  });
};
