import { calculateHrend, getRandomItems, printResults } from "./utils";
import { measureTime } from "./utils";
const { faker } = require("@faker-js/faker");
import { getDbs } from "./utils";
import dataTypes from "../common/dataTypes";

const table = {
  int: dataTypes.INT,
  int_auto_inc: dataTypes.INT_AUTO_INC,
  uuid: dataTypes.UUID,
  email: dataTypes.EMAIL,
};
const modelName = "dummy_table";

const dbs = await getDbs();

const HOW_MANY_RECORD = parseInt(process.env.HOW_MANY_RECORD) ?? 10000;

export async function findOneByIds(oneRecords) {
  console.log("------findOneById-------");
  const resultsFindOneById = await Promise.all(
    dbs.map(async (db) => {
      // db.findOneById(id, modelName)
      const result = await measureTime(db.findOneById.bind(db), [
        oneRecords.find((x) => x.name === db.name).records[0].id,
        modelName,
      ]);
      result.name = db.name;
      return result;
    })
  );
  printResults(resultsFindOneById);
  console.log("------findOneById-end-------");

  return { results: resultsFindOneById, data: null };
}

export async function findAll() {
  console.log("------findAll-------");
  const resultsFindAll = await Promise.all(
    dbs.map(async (db) => {
      // db.findOneById(id, modelName)
      const result = await measureTime(db.findAll.bind(db), [modelName]);
      result.name = db.name;
      return result;
    })
  );
  printResults(resultsFindAll);
  console.log("------findAll-end-------");
  return { results: resultsFindAll, data: null };
}

export async function getRandomRecords() {
  console.log("------getRandomRecords-------");
  const resultsFindAll = await Promise.all(
    dbs.map(async (db) => {
      // db.findOneById(id, modelName)
      const result = await measureTime(db.getRandomRecords.bind(db), [
        modelName,
        500,
        faker.number.int(HOW_MANY_RECORD - 502),
      ]);
      result.name = db.name;
      return result;
    })
  );
  printResults(resultsFindAll);
  console.log("------getRandomRecords-end-------");
  return {
    results: resultsFindAll,
    data: resultsFindAll.map((x) => {
      return {
        name: x.name,
        records: Array.isArray(x.results) ? x.results : [x.results],
      };
    }),
  };
}
export async function insertManys() {
  console.log("------insertMany-------");
  const promisesObjects = {};
  let recordCounter = 0;
  var hrstart = process.hrtime();
  for (let j = 0; j < HOW_MANY_RECORD / 50; j++) {
    const modelObjects = [];
    for (let i = 0; i < 50; i++) {
      modelObjects.push({
        int: faker.number.int(HOW_MANY_RECORD),
        int_auto_inc: recordCounter,
        uuid: faker.string.uuid(),
        email: faker.internet.email(),
      });
      recordCounter++;
    }
    dbs.map(async (db) => {
      // db.insertMany(modelName, modelObjects)
      if (!promisesObjects[db.name]) {
        promisesObjects[db.name] = [];
      }
      promisesObjects[db.name].push(db.insertMany(modelName, modelObjects));
    });
  }
  let generalPromiseArr = [];
  for (const [key, value] of Object.entries(promisesObjects)) {
    generalPromiseArr.push(
      Promise.all(value).then((x) => {
        return { time: calculateHrend(hrstart), name: key, results: null };
      })
    );
  }

  const resultsinsertMany = await Promise.all(generalPromiseArr);
  printResults(resultsinsertMany);
  console.log("------insertMany-end-------");
  return { results: resultsinsertMany, data: null };
}
export async function insertOnes() {
  console.log("------insertOne-------");
  const modelObject = {
    int: faker.number.int(155),
    int_auto_inc: 0,
    uuid: faker.string.uuid(),
    email: faker.internet.email(),
  };
  const resultsInsertOne = await Promise.all(
    dbs.map(async (db) => {
      // db.insertOne(modelName, modelObject)
      const result = await measureTime(db.insertOne.bind(db), [
        modelName,
        modelObject,
      ]);
      result.name = db.name;
      return result;
    })
  );
  printResults(resultsInsertOne);
  console.log("------insertOne-end-------");
  return {
    results: resultsInsertOne,
    data: resultsInsertOne.map((x) => {
      return {
        name: x.name,
        records: Array.isArray(x.results) ? x.results : [x.results],
      };
    }),
  };
}
export async function inits() {
  console.log("------init-------");
  const resultsInit = await Promise.all(
    dbs.map(async (db) => {
      // db.init(modelName, table);
      const result = await measureTime(db.init.bind(db), [modelName, table]);

      result.name = db.name;
      return result;
    })
  );
  printResults(resultsInit);
  console.log("------init-end-------");
  return { results: resultsInit, data: null };
}

export async function findManyByIds(randomRecords) {
  {
    console.log("------findManyByIds-------");
    const resultsFindOneById = await Promise.all(
      dbs.map(async (db) => {
        // db.findManyById(ids, modelName)
        const result = await measureTime(db.findManyById.bind(db), [
          getRandomItems(
            randomRecords.find((x) => x.name === db.name).records,
            50
          ).map((x) => x.id),
          modelName,
        ]);
        result.name = db.name;
        return result;
      })
    );
    printResults(resultsFindOneById);
    console.log("------findManyByIds-end-------");
    return { results: resultsFindOneById, data: null };
  }
}

export async function findManyByEmails(randomRecords) {
  {
    console.log("------findManyByEmails-------");
    const resultsfindManyByEmails = await Promise.all(
      dbs.map(async (db) => {
        // db.findAllByFieldIn(modelName, fieldName, values)
        const result = await measureTime(db.findAllByFieldIn.bind(db), [
          modelName,
          "email",
          getRandomItems(
            randomRecords.find((x) => x.name === db.name).records,
            50
          ).map((x) => x.email),
        ]);
        result.name = db.name;
        return result;
      })
    );
    printResults(resultsfindManyByEmails);
    console.log("------findManyByEmails-end-------");

    return { results: resultsfindManyByEmails, data: null };
  }
}

export async function findManyByEmailsAfterIndex(randomRecords) {
  {
    return findManyByEmails(randomRecords);
  }
}

export async function createIndex() {
  {
    console.log("------createIndex-------");
    const resultsCreateIndex = await Promise.all(
      dbs.map(async (db) => {
        // db.createIndex(modelName, fieldName)
        const result = await measureTime(db.createIndex.bind(db), [
          modelName,
          "email",
        ]);
        result.name = db.name;
        return result;
      })
    );
    printResults(resultsCreateIndex);
    console.log("------createIndex-end-------");
    return { results: resultsCreateIndex, data: null };
  }
}

export async function findOneByEmailsAfterIndex(randomRecords) {
  {
    console.log("------findOneByEmailsAfterIndex-------");
    const resultsfindManyByEmails = await Promise.all(
      dbs.map(async (db) => {
        // db.findAllByField(modelName, fieldName, value)
        const result = await measureTime(db.findAllByField.bind(db), [
          modelName,
          "email",
          getRandomItems(
            randomRecords.find((x) => x.name === db.name).records,
            50
          ).map((x) => x.email)[6],
        ]);
        result.name = db.name;
        return result;
      })
    );
    printResults(resultsfindManyByEmails);
    console.log("------findOneByEmailsAfterIndex-end-------");
    return { results: resultsfindManyByEmails, data: null };
  }
}
