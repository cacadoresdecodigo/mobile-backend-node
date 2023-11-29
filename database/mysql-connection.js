const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "teste-sa",
};

class MysqlConnection {
  constructor() {}

  async getConnection() {
    if (MysqlConnection.connection) {
      return MysqlConnection.connection;
    }
    MysqlConnection.connection = await mysql.createConnection(dbConfig);

    return MysqlConnection.connection;
  }
}

module.exports = MysqlConnection;
