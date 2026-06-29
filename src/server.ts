import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { routes } from "./routes/index.routes";

AppDataSource.initialize()
  .then(() => {
    console.log("banco conectado");

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(routes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("erro:", error));
