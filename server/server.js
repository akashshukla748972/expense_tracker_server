import http from "http";
import app from "./app.js";
import { connectToDb } from "./src/configs/db.js";

const server = http.createServer(app);

const PORT = 4000;

connectToDb().then(() => {
  server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
  });
});
