const { Sequelize, DataTypes } = require("sequelize");
const DATA_TYPES = require("../../common/dataTypes");

const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost.com:5432/postgres"
); // Example for postgres

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const dbDatatypesMap = {
  [DATA_TYPES.INT]: { sequelize: { type: DataTypes.INTEGER } },
  [DATA_TYPES.INT_AUTO_INC]: {
    sequelize: { type: DataTypes.INTEGER, autoIncrement: true },
  },
  [DATA_TYPES.UUID]: {
    sequelize: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  [DATA_TYPES.EMAIL]: { sequelize: { type: DataTypes.STRING } },
};

async function initSequelze(modelName, modelDefinition) {
  const db = {};
  const sequelizeDefinition = Object.entries(modelDefinition).reduce(
    (obj, keyAndType) =>
      (obj[keyAndType[0]] = dbDatatypesMap[keyAndType[0].sequelize]),
    {}
  );
  db[modelName] = sequelize.define(modelName, sequelizeDefinition);

  await sequelize.sync({ force: true });

  return db;
}

module.exports = { initSequelze };
