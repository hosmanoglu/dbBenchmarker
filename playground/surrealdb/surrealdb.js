// import as ES module or common JS
const { Surreal } = require("surrealdb.node");
const DATA_TYPES = require("../../common/dataTypes");
const db = new Surreal();

// connect to database server
await db.connect("ws://127.0.0.1:8000", {
  user: "surrealdb",
  pass: "surrealdb",
});

// Select a specific namespace / database
await db.use({ ns: "test", db: "test" });

const dbDatatypesMap = {
  [DATA_TYPES.INT]: "",
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

async function initSurrealdb(modelName, modelDefinition) {
  const db = new Surreal();

  // connect to database server
  await db.connect("ws://127.0.0.1:8000", {
    user: "surrealdb",
    pass: "surrealdb",
  });

  // Select a specific namespace / database
  await db.use({ ns: "test", db: "test" });
}

module.exports = { initSurrealdb };
