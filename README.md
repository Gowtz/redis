
<p align="center">
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdownload.logo.wine%2Flogo%2FRedis%2FRedis-Logo.wine.png&f=1&nofb=1&ipt=e2f17eb94dc52b39d08187a2f50a00809674301b004a3ed06ccb8a002571bcd9&ipo=images"></img>
</p>


# Its an alternate version of Redis
- This is an implimentation of redis server using javascript. This server is compatable with all redis client like `redis-cli` and more language clients.
- This implimentation is not effecient as the original redis server.
- Its just for gaining the knowledge of implimentation of the redis server


### How to run this server

- Clone this repo
  ```bash
  git clone https://github.com/Gowtz/redis
  ```

- Install dependinces
  ```bash
  npm i
  ```

- Run the server
  ```bash
  npm run start
  ```

- Connect from redis-cli
  ```bash
  redis-cli -p 8000
  ```


## Implementation are working

- set
- get
- del
- expire
- append
- incr
- decr
- lpush
- rpush
- lpop
- rpop
