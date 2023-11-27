const mysql = require("mysql2/promise");

// Configurações de conexão ao banco de dados
const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "teste-sa",
};

class PagamentoController {
  constructor() {}

  async cadastrar(req, resp) {
    try {
      const pagamento = req.body;
      console.log(pagamento);
      const connection = await mysql.createConnection(dbConfig);
      const sql = `INSERT INTO pagamento (numero_cartao, nome, cpf, validade, cvv) VALUES (?, ?, ?, ?, ?)`;
      const [results] = await connection.execute(sql, [
        pagamento.numeroCartao,
        pagamento.nomeCartao,
        pagamento.cpf,
        pagamento.validade,
        pagamento.cvv,
      ]);

      const sql2 = 'UPDATE cliente SET pagamento_id = ? WHERE id = ?';
        await connection.execute(sql2, [
        

      ]);

      return resp.json({ ...pagamento, id: results.insertId });
    } catch (error) {
        console.log(error);
      return resp.status(500).json(error);
    }
  }
}

module.exports = PagamentoController;
