let c = 1;

async function count() {
  console.log(c++);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  count(); // Call the count function recursively
}

// Start the counter
count();
