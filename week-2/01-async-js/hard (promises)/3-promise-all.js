/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */
async function time(t) {
  return new Promise((resolve, reject) => {
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
  const startTime = Date.now(); // Record the start time

  await Promise.all([wait1(t1), wait2(t2), wait3(t3)]);

  return Date.now() - startTime;

  // Return the total time taken in milliseconds
}

module.exports = calculateTime;
