/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

// calculateTime.js
async function time(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(t);
    }, t * 1000);
  });
}

async function wait1(t) {
  return time(t);
}

async function wait2(t) {
  return time(t);
}

async function wait3(t) {
  return time(t);
}

async function calculateTime(t1, t2, t3) {
  const start = Date.now();
  await wait1(t1); // Await the promise returned by wait1
  await wait2(t2); // Await the promise returned by wait2
  await wait3(t3); // Await the promise returned by wait3
  const end = Date.now();
  return end - start;
}

module.exports = calculateTime;
