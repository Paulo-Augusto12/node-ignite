import http from "node:http";
import { Database } from "./database.js";

// const users = [];

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {

    const users = database.select('users')
    return res
      .setHeader("Content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body

    const id = Math.random() * 10 * 10 + 1;
    
    const user = {
      id,
      name,
      email,
    };

    database.insert('users', user)

    
    return res.writeHead(201).end();
  }
  return res.writeHead(404).end("ERROR: Caminho não encontrado !");
});

server.listen(3333);
