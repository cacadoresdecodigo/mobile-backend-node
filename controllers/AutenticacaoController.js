const MysqlConnection = require("../database/mysql-connection");



class AutenticacaoController {
  constructor() {}

  async logar(req, resp) {
    try {
      const usuario = req.body;
      const connection = await new MysqlConnection().getConnection();
      const sql = `SELECT * FROM cliente WHERE email = ? AND senha = md5(?)`;
      const [results] = await connection.execute(sql, [usuario.email, usuario.senha]);

      if (results.length > 0) {
        return resp.json(results[0]);
      } else {
        return resp.status(401).json("Unauthorized!");
      }
    } catch (error) {
      resp.status(500).json(error.message);
    }
  }
}

module.exports = AutenticacaoController;
