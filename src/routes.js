import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();
export const routes = [
  {
    method: "GET",
    url: "/users",
    handler: (req, res) => {
      const users = database.select("users");
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    url: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;

      const id = randomUUID();
      const user = {
        id,
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    url:"/users/",
    handler: (req, res) => {
      return res.end()
    }
  }
];
