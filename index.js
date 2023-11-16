const express = require("express");
const ClienteController = require("./controllers/ClientesController");
// const cors = require("cors");

const server = express();
// server.use(
//   cors({
//     origin: "*", // Substitua pelo domínio do seu frontend
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Habilita o envio de cookies pela origem
//     optionsSuccessStatus: 204,
//   })
// );

server.use(express.json());

//CADASTRO CLIENTE
const clientesController = new ClienteController();

server.get("/clientes", clientesController.listar);
server.post("/clientes", clientesController.cadastrar);
server.put("/clientes", clientesController.atualizar);
server.delete("/clientes/:id", clientesController.deletar);

server.listen(3000);
