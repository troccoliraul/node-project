import { createConnection } from "typeorm";
import { environment } from "./environment";

export async function connect() {
  try {
    const connection = await createConnection({
      type: "mysql",
      port: Number(environment.DB_PORT),
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: environment.DB_DATABASE,
      entities: ["../entity/**/*.ts"],
      synchronize: true,
      ssl: true,
    });

    if (!connection) {
      throw new Error("Error connecting to database");
    }

    console.log("Database connected");

    // Puedes realizar operaciones de base de datos aquí
  } catch (error) {
    console.error(error);
  }
}

// Llama a la función connect para establecer la conexión
connect();
