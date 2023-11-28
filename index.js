const express = require("express");
const ClienteController = require("./controllers/ClientesController");
const LocalRetiradaController = require("./controllers/LocalRetiradaController");
const PlanoController = require("./controllers/PlanoController");
const PagamentoController = require("./controllers/PagamentoController");
const AutenticacaoController = require("./controllers/AutenticacaoController");
const cors = require("cors");

const server = express();
server.use(
  cors({
    origin: "*", // Substitua pelo domínio do seu frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita o envio de cookies pela origem
    optionsSuccessStatus: 204,
  })
);

server.use(express.json());

//CADASTRO CLIENTE
const clientesController = new ClienteController();

server.get("/clientes", clientesController.listar);
server.post("/clientes", clientesController.cadastrar);
server.put("/clientes", clientesController.atualizar);
server.delete("/clientes/:id", clientesController.deletar);

//ESCOLHER LOCAL RETIRADA
const localRetiradaController = new LocalRetiradaController();

server.get("/local-retirada", localRetiradaController.listar);

//ESCOLHER PLANO
const planoController = new PlanoController();

server.get("/plano", planoController.listar);

//CADASTRAR PAGAMENTO
const pagamentoController = new PagamentoController();

server.post("/pagamento", pagamentoController.cadastrar);
server.get("/pagamento/:id", pagamentoController.buscarPagamentoPeloId);
server.put("/pagamento", pagamentoController.atualizar);

// AUTENTICAR LOGIN

const autenticacaoController = new AutenticacaoController();

server.post("/logar", autenticacaoController.logar);

server.listen(3000);
