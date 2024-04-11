// Import necessary modules
const moment = require('moment');

// Function to update and display the clock
function displayClock() {
  // Get current time
  const currentTime = moment();

  // Format time as HH:MM:SS

  // Format time as HH:MM:SS AM/PM
  const timeFormat12 = currentTime.format('hh:mm:ss A');

  // Output the formatted times

  console.log(`Current time (12-hour format): ${timeFormat12}`);
}

// Update and display the clock every second
setInterval(displayClock, 1000);
