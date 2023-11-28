const mysql = require("mysql2/promise");

// Configurações de conexão ao banco de dados
const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "teste-sa",
};

class ClienteController {
  constructor() {}

  async listar(req, resp) {
    try {
      const filtro = req.query.filtro || "";

      const connection = await mysql.createConnection(dbConfig);
      const sql = "SELECT * FROM cliente WHERE nome LIKE ?";
      const [resultado] = await connection.execute(sql, [`%${filtro}%`]);

      return resp.json(resultado);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }

  async cadastrar(req, resp) {
    try {
      const cliente = req.body;
      const connection = await mysql.createConnection(dbConfig);
      const sql = `INSERT INTO cliente (nome, cpf, email, senha) VALUES (?, ?, ?, md5(?))`;
      const [results] = await connection.execute(sql, [cliente.nome, cliente.cpf, cliente.email, cliente.senha]);

      return resp.json({ ...cliente, id: results.insertId });
    } catch (error) {
      return resp.status(500).json(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const cliente = req.body;

      const connection = await mysql.createConnection(dbConfig);
      const sql = `UPDATE cliente SET nome = ?, cpf = ?, email = ?, senha = md5(?), local_retirada_id = ?, plano_id = ?, pagamento_id = ? WHERE id = ?`;
      await connection.execute(sql, [
        cliente.nome,
        cliente.cpf,
        cliente.email,
        cliente.senha,
        cliente.localRetiradaId || null,
        cliente.planoId || null,
        cliente.pagamentoId || null,
        cliente.id,
      ]);

      return resp.json(cliente);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }

  async deletar(req, resp) {
    try {
      const id = req.params.id;
      const connection = await mysql.createConnection(dbConfig);
      const sql = `DELETE FROM cliente WHERE id = ?`;
      const [results] = await connection.execute(sql, [id]);

      return resp.json(results);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }
}

module.exports = ClienteController;
