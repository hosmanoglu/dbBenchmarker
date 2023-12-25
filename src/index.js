import {
  inits,
  insertOnes,
  insertManys,
  findOneByIds,
  getRandomRecords,
  findManyByIds,
  findManyByEmails,
  createIndex,
  findManyByEmailsAfterIndex,
  findOneByEmailsAfterIndex,
} from "./senario";

const resultObj = {};

const initsResults = await inits();
resultObj.inits = initsResults.results;

const oneRecordsResults = await insertOnes();
resultObj.insertOnes = oneRecordsResults.results;

const findOneByIdsResults = await findOneByIds(oneRecordsResults.data);
resultObj.findOneByIds = findOneByIdsResults.results;

const insertManysResults = await insertManys();
resultObj.insertManys = insertManysResults.results;

const getRandomRecordsResutls = await getRandomRecords();
resultObj.getRandomRecords = getRandomRecordsResutls.results;

const findManyByIdsResutls = await findManyByIds(getRandomRecordsResutls.data);
resultObj.findManyByIds = findManyByIdsResutls.results;

const findManyByEmailsResutls = await findManyByEmails(getRandomRecordsResutls.data);
resultObj.findManyByEmails = findManyByEmailsResutls.results;

const createIndexResutls = await createIndex();
resultObj.createIndex = createIndexResutls.results;

const findOneByEmailsAfterIndexResutls = await findOneByEmailsAfterIndex(getRandomRecordsResutls.data);
resultObj.findOneByEmailsAfterIndex = findOneByEmailsAfterIndexResutls.results;

const findManyByEmailsAfterIndexResutls = await findManyByEmailsAfterIndex(getRandomRecordsResutls.data);
resultObj.findManyByEmailsAfterIndex = findManyByEmailsAfterIndexResutls.results;

console.log("done");

for (const [key, value] of Object.entries(resultObj)) {
  value.sort((a, b) => a.time - b.time);
  for (const iterator of value) {
    console.log(`${key}->  ${iterator.name}: ${iterator.time}     `);
  }
  console.log("-----***----");
}
console.log("done");
