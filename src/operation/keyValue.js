export const set = (STORE, connection, reply) => {
  if (reply.length === 3) {
    const key = reply[1];
    const value = reply[2];
    STORE.set(key, value);
    connection.write("+OK\r\n");
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'set' command\r\n",
    );
  }
};

export const get = (STORE, connection, reply) => {
  const key = reply[1];
  const value = STORE.get(key);
  if (!value) connection.write("$-1\r\n");
  else connection.write(`$${value.length}\r\n${value}\r\n`);
};

export const del = (STORE, connection, reply) => {
  const key = reply[1];
  STORE.delete(key);
  connection.write("+OK\r\n");
};

export const expire = (STORE, connection, reply) => {
  //Code goes here
  const key = reply[1];
  const time = reply[2] * 1000;
  setTimeout(() => STORE.delete(key), time);
  connection.write("+OK\r\n");
};

export const append = (STORE, connection, reply) => {
  if (reply.length === 3) {
    const key = reply[1];
    const value = reply[2];
    const getValue = STORE.get(key);
    STORE.set(key, getValue.concat(value));
    connection.write("+OK\r\n");
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'append' command\r\n",
    );
  }
};

