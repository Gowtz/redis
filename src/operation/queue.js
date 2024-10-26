import { QUEUE } from "../dataStore.js";

export const lpush = (connection, reply) => {
  if (reply.length === 3) {
    const key = reply[1];
    const value = reply[2];
    const oldValue = QUEUE.get(key);
    if (oldValue) {
      oldValue.unshift(value);
      QUEUE.set(key, oldValue);
    } else {
      const newArray = new Array(value);
      QUEUE.set(key, newArray);
    }
    connection.write(`+(integer) "${QUEUE.get(key).length}"\r\n`);
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'lpush' command\r\n",
    );
  }
};

export const rpush = (connection, reply) => {
  if (reply.length === 3) {
    const key = reply[1];
    const value = reply[2];
    const oldValue = QUEUE.get(key);
    if (oldValue) {
      oldValue.push(value);
      QUEUE.set(key, oldValue);
    } else {
      const newArray = new Array(value);
      QUEUE.set(key, newArray);
    }
    connection.write(`+(integer) "${QUEUE.get(key).length}"\r\n`);
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'rpush' command\r\n",
    );
  }
};
export const lpop = (connection, reply) => {
  if (reply.length === 2) {
    const key = reply[1];
    const oldValue = QUEUE.get(key);
    if (!oldValue) connection.write(`$-1\r\n`);
    else {
      const outValue = oldValue.shift();
      QUEUE.set(key, oldValue);
      if (outValue) connection.write(`$${outValue.length}\r\n${outValue}\r\n`);
      else {
        connection.write(`$-1\r\n`);
      }
    }
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'lpop' command\r\n",
    );
  }
};

export const rpop = (connection, reply) => {
  if (reply.length === 2) {
    const key = reply[1];
    const oldValue = QUEUE.get(key);
    if (!oldValue) connection.write(`$-1\r\n`);
    else {
      const outValue = oldValue.pop();
      QUEUE.set(key, oldValue);
      if (outValue) connection.write(`$${outValue.length}\r\n${outValue}\r\n`);
      else {
        connection.write(`$-1\r\n`);
      }
    }
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'rpop' command\r\n",
    );
  }
};
