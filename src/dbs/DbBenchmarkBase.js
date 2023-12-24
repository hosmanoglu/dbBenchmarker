class DbBenchmarkBase {
  async init() {}

  async insertOne(modelName, modelObject) {}

  async insertMany(modelName, modelObjects) {}

  async findOneById(modelName, id) {}

  async findManyById(modelName, ids) {}

  async findAll(modelName) {}

  async getRandomRecords(modelName, limit = 500, offset = 0) {}

  async findAllByField(modelName, fieldName, value) {}

  async findAllByFieldIn(modelName, fieldName, values) {}

  async createIndex(modelName, fieldName) {}
}

module.exports = { DbBenchmarkBase };
