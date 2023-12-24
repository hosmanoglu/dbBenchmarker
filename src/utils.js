const fs = require("fs");

async function getDbs() {
  const path = "./src/dbs";

  let files = await fs.promises.readdir(path);

  files = files.filter((e) => e !== "DbBenchmarkBase.js");

  return await Promise.all(
    files.map(async (file) => {
      return require("./dbs/" + file.substring(0, file.length - 3)).benchMarkDb;
    })
  );
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function measureTime(func, args) {
  var hrstart = process.hrtime();
  let results = await func(...args);
  return { results, time: calculateHrend(hrstart) };
}

function calculateHrend(hrstart) {
  var hrend = process.hrtime(hrstart);
  return hrend[0] * 1000 + hrend[1] / 100000;
}

function printResults(results) {
  results.sort((a, b) => a.time - b.time);
  console.table(results);
}

const getRandomItems = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // Diziyi karıştırır
  return shuffled.slice(0, count); // Belirtilen sayıda rastgele öğe seçer
};
module.exports = {
  getDbs,
  measureTime,
  printResults,
  calculateHrend,
  getRandomItems,
};
