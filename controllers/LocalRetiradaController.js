const MysqlConnection = require("../database/mysql-connection");

class localRetiradaController {
  constructor() {}

  async listar(req, resp) {
    try {
      const connection = await new MysqlConnection().getConnection();
      const sql = "SELECT * FROM local_retirada";
      const [resultado] = await connection.execute(sql);

      return resp.json(resultado);
    } catch (error) {
      return resp.status(500).json(error);
    }
  }
}

module.exports = localRetiradaController;
