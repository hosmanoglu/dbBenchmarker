const { DbBenchmarkBase } = require("./DbBenchmarkBase");
const { Sequelize, DataTypes } = require("sequelize");
const DATA_TYPES = require("../../common/dataTypes");

const dbDatatypesMap = {
  [DATA_TYPES.INT]: { sequelize: { type: DataTypes.INTEGER } },
  [DATA_TYPES.INT_AUTO_INC]: {
    sequelize: { type: DataTypes.INTEGER },
  },
  [DATA_TYPES.UUID]: {
    sequelize: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  [DATA_TYPES.EMAIL]: { sequelize: { type: DataTypes.STRING } },
};

class Postgresql extends DbBenchmarkBase {
  db = {};
  name = "postgresql";

  async init(modelName, modelDefinition) {
    this.sequelize = new Sequelize(process.env.POSTGRESQL_URL);

    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
    const sequelizeDefinition = Object.entries(modelDefinition).reduce(
      (obj, keyAndType) => {
        obj[keyAndType[0]] = dbDatatypesMap[keyAndType[1]].sequelize;
        return obj;
      },
      {}
    );
    this.db[modelName] = this.sequelize.define(modelName, sequelizeDefinition, {
      freezeTableName: true,
    });

    await this.sequelize.sync({ force: true });
  }

  insertOne(modelName, modelObject) {
    return this.db[modelName].create(modelObject);
  }

  insertMany(modelName, modelObjects) {
    return this.db[modelName].bulkCreate(modelObjects);
  }

  findOneById(id, modelName) {
    return this.db[modelName].findOne({ where: { id } });
  }

  findManyById(ids, modelName) {
    return this.db[modelName].findAll({ where: { id: ids } });
  }

  findAll(modelName, limit = 500, offset = 0) {
    const options = {
      ...(limit && { limit }),
      ...(offset && { offset }),
    };
    return this.db[modelName].findAll(options);
  }

  getRandomRecords(modelName, limit = 500, offset = 0) {
    return this.findAll(modelName, limit, offset);
  }

  findAllByField(modelName, fieldName, value) {
    return this.db[modelName].findAll({ where: { [fieldName]: value } });
  }

  findAllByFieldIn(modelName, fieldName, values) {
    return this.db[modelName].findAll({ where: { [fieldName]: values } });
  }

  createIndex(modelName, fieldName) {
    return this.sequelize.query(
      ` CREATE INDEX idx_${modelName}_${fieldName} ON ${modelName}(${fieldName}) ; `
    );
  }
}

module.exports = { benchMarkDb: new Postgresql() };
