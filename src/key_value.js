export const SET = (store, connection, reply) => {
  if (reply[2]) {
    const key = reply[1];
    const value = reply[2];
    store.set(key, value);
    connection.write("+OK\r\n");
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'set' command\r\n",
    );
  }
};

export const GET = (store, connection, reply) => {
  const key = reply[1];
  const value = store.get(key);
  if (!value) connection.write("$-1\r\n");
  else connection.write(`$${value.length}\r\n${value}\r\n`);
};

export const DEL = (store, connection, reply) => {
  const key = reply[1];
  store.delete(key);
  connection.write("+OK\r\n");
};

export const EXPIRE = (store, connection, reply) => {
  //Code goes here
  const key = reply[1];
  const time = reply[2] * 1000;
  setTimeout(() => store.delete(key), time);
  connection.write("+OK\r\n");
};
