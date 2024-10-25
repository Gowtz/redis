export const incr = (INCREMENTOR, connection, reply) => {
  if (reply.length === 2) {
    const key = reply[1];
    const getValue = INCREMENTOR.get(key);
    if (getValue) {
      const inc = parseInt(getValue, 10) + 1;
      INCREMENTOR.set(key, `${inc}`);
    } else {
      INCREMENTOR.set(key, "1");
    }
      connection.write(`+(interger) ${INCREMENTOR.get(key)}\r\n`);
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'incr' command\r\n",
    );
  }
};

export const decr = (INCREMENTOR, connection, reply) => {
  if (reply.length === 2) {
    const key = reply[1];
    const getValue = INCREMENTOR.get(key);
    if (getValue) {
      const inc = parseInt(getValue, 10) - 1;
      INCREMENTOR.set(key, `${inc}`);
    } else {
      INCREMENTOR.set(key, "-1");
    }
      connection.write(`+(interger) ${INCREMENTOR.get(key)}\r\n`);
  } else {
    connection.write(
      "+(error) ERR wrong number of arguments for 'decr' command\r\n",
    );
  }
};
