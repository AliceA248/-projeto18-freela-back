import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Função para fechar a conexão com o banco de dados
function closeConnection() {
  db.end()
    .then(() => {
      console.log("Connection to the database closed");
    })
    .catch((error) => {
      console.error("Error closing the database connection:", error);
    });
}

export { db, closeConnection };
