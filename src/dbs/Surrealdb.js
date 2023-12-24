const { DbBenchmarkBase } = require("./DbBenchmarkBase");
const { Surreal } = require("surrealdb.node");
//const DATA_TYPES = require("../common/dataTypes");

// maybe in the future
// const dbDatatypesMap = {
//   [DATA_TYPES.INT]: "",
//   [DATA_TYPES.INT_AUTO_INC]: {
//     sequelize: { type: DataTypes.INTEGER, autoIncrement: true },
//   },
//   [DATA_TYPES.UUID]: {
//     sequelize: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//     },
//   },
//   [DATA_TYPES.EMAIL]: { sequelize: { type: DataTypes.STRING } },
// };

class Surrealdb extends DbBenchmarkBase {
  name = "surrealdb";
  db = {};
  async init() {
    this.db = new Surreal();

    // connect to database server
    await this.db.connect(process.env.SURREALDB_URL, {
      user: process.env.SURREALDB_USER,
      pass: process.env.SURREALDB_PASS,
    });

    // Select a specific namespace / database
    await this.db.use({
      ns: process.env.SURREALDB_NAME_SPACE,
      db: process.env.SURREALDB_DATABASE,
    });
  }

  insertOne(modelName, modelObject) {
    return this.db.create(modelName, modelObject);
  }

  insertMany(modelName, modelObjects) {
    // return this.db.insert(modelName, modelObjects); //TODO when surrealdb.node version > 1
    return this.db.query(` INSERT INTO ${modelName} [
      ${modelObjects
        .map((modelObject) => JSON.stringify(modelObject))
        .join(",")}
    ]`);
  }

  // findOneById(id, modelName) {
  //   return this.db.query(` SELECT * FROM ${modelName}:${id};`);
  // }

  findOneById(id, modelName) {
    return this.db.select(id);
  }

  findManyById(ids, modelName) {
    return this.db.query(` SELECT * FROM [${ids} ];`);
  }

  findAll(modelName) {
    return this.db.select(modelName);
  }

  getRandomRecords(modelName, limit = 500, offset = 0) {
    return this.db.query(
      ` SELECT * FROM ${modelName} LIMIT ${limit} START ${offset} ;`
    );
  }

  findAllByField(modelName, fieldName, value) {
    return this.db.query(
      ` SELECT * FROM ${modelName} WHERE ${fieldName} = '${value}' ;`
    );
  }

  findAllByFieldIn(modelName, fieldName, values) {
    return this.db.query(
      ` SELECT * FROM ${modelName} WHERE ${fieldName} IN ['${values.join(
        "','"
      )}'];`
    );
  }
  createIndex(modelName, fieldName) {
    return this.db.query(
      `DEFINE  INDEX idx_${modelName}_${fieldName} ON TABLE  ${modelName} COLUMNS  ${fieldName};`
    );
  }
}

module.exports = { benchMarkDb: new Surrealdb() };
