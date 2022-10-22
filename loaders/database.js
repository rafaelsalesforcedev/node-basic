let Sequelize = require("sequelize");
let pg = require("pg");
pg.defaults.ssl = true;

//
// ─── CONFIGURANDO A CONEXAO DO BANCO DADOS ─────────────────────────────────────────
//
const connection = new Sequelize({
  database: process.env.database,
  username: process.env.usernameDatabase,
  password: process.env.passwordDatabase,
  host: process.env.hostDatabase,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});

module.exports = connection;