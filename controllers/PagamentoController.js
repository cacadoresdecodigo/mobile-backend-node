const MysqlConnection = require("../database/mysql-connection");

class PagamentoController {
  constructor() {}

  async cadastrar(req, resp) {
    try {
      const pagamento = req.body;
      const connection = await new MysqlConnection().getConnection();
      const sql = `INSERT INTO pagamento (numero_cartao, nome, cpf, validade, cvv) VALUES (?, ?, ?, ?, ?)`;
      const [results] = await connection.execute(sql, [
        pagamento.numeroCartao,
        pagamento.nomeCartao,
        pagamento.cpf,
        pagamento.validade,
        pagamento.cvv,
      ]);

      return resp.json({ ...pagamento, id: results.insertId });
    } catch (error) {
      console.log(error);
      return resp.status(500).json(error);
    }
  }

  async buscarPagamentoPeloId(req, resp) {
    try {
      const id = req.params.id;

      const connection = await new MysqlConnection().getConnection();
      const sql = "SELECT * FROM pagamento WHERE id = ?";
      const [resultado] = await connection.execute(sql, [id]);

      return resp.json(resultado[0]);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const pagamento = req.body;
      const connection = await new MysqlConnection().getConnection();
      const sql = `UPDATE pagamento SET numero_cartao = ?, nome = ?, cpf = ?, validade = ?, cvv = ? WHERE id = ?`;
      await connection.execute(sql, [
        pagamento.numeroCartao,
        pagamento.nomeCartao,
        pagamento.cpf,
        pagamento.validade,
        pagamento.cvv,
        pagamento.id,
      ]);

      return resp.json(pagamento);
    } catch (error) {
      console.log(error);
      return resp.status(500).json(error);
    }
  }
}

module.exports = PagamentoController;
