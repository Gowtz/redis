import { HASH } from "../dataStore.js";

export const hset = (connection, reply) => {
  if (reply.length > 2 && reply.length % 2 == 0) {
    const key = reply[1];
    reply.shift();
    reply.shift();
    const newValue = new Array();
    for (let index = 0; index < reply.length / 2; index++) {
      newValue.push([reply[index * 2], reply[index * 2 + 1]]);
    }
    HASH.set(key, newValue);
    connection.write("+SUKA\r\n");
  } else {
    connection.write("+Error args not matched\r\n");
  }
};

export const hgetall = (connection, reply) => {
  if (reply.length == 2) {
    const key = reply[1];
    const value = HASH.get(key);
    if (!value) connection.write("+(empty array)\r\n");
    else {
      const flatValue = value.flat();
      let result = `*${flatValue.length}\r\n`;
      flatValue.forEach((ele) => {
        result += `$${ele.length}\r\n${ele}\r\n`;
      });
      connection.write(result);
    }
  } else {
    connection.write("+Error args not matched\r\n");
  }
};

export const hget = (connection, reply) => {
  if (reply.length == 3) {
    const key = reply[1];
    const subKey = reply[2];
    const value = HASH.get(key);
    if (!value) connection.write("+(empty array)\r\n");
    else {
      let result = ``;
      value.map((ele) => {
        if (ele[0] === subKey) {
          result = `$${ele[1].length}\r\n${ele[1]}\r\n`;
        }
      });
      connection.write(result);
    }
  } else {
    connection.write("+Error args not matched\r\n");
  }
};
