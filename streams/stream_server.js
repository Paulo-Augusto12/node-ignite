import http from "node:http";

import { Transform } from "node:stream";
class convertToNegative extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString() * -1);
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullbody = Buffer.concat(buffers).toString()

  console.log(fullbody)

  return res.end(fullbody)

  // return req.pipe(new convertToNegative())
  // .pipe(res);
});

server.listen(3334);
