const mysql = require("mysql2/promise");

// Configurações de conexão ao banco de dados
const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "teste-sa",
};

class localRetiradaController {
  constructor() {}

  async listar(req, resp) {
    try {
      const filtro = req.query.filtro || "";

      const connection = await mysql.createConnection(dbConfig);
      const sql = "SELECT * FROM local_retirada WHERE nome LIKE ?";
      const [resultado] = await connection.execute(sql, [`%${filtro}%`]);

      return resp.json(resultado);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }


}

module.exports = localRetiradaController;
