import { startServer } from "./server";
import { connect } from "./config/typeorm";
import "reflect-metadata";

async function main() {
  connect();

  try {
    const port: number = 4000;
    const app = await startServer();
    app.listen(port);
    console.log("app running on port", port);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
