const { Sequelize } = require("sequelize");
require("dotenv").config();

// Two ways to configure the database:
//   1. DATABASE_URL  → what Render / Neon / Railway hand you (preferred in production)
//   2. DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD → classic local setup
//   3. DB_DIALECT=sqlite → local file database, no Postgres install needed (dev/testing only)

const dialect = process.env.DB_DIALECT || "postgres";
const logging = process.env.DB_LOGGING === "true" ? console.log : false;

let sequelize;

if (dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.SQLITE_FILE || "./dev-database.sqlite",
    logging,
  });
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging,
    dialectOptions:
      process.env.DB_SSL === "false"
        ? {}
        : { ssl: { require: true, rejectUnauthorized: false } },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging,
      dialectOptions:
        process.env.DB_SSL === "true"
          ? { ssl: { require: true, rejectUnauthorized: false } }
          : {},
    }
  );
}

const connectDB = async () => {
  await sequelize.authenticate();
  console.log(`Database connected (${sequelize.getDialect()})`);
};

module.exports = sequelize;
module.exports.connectDB = connectDB;
