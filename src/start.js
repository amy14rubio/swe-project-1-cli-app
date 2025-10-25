const { showMenu } = require("./menu.js");

// This is the main entry point for the application.
const startApp = () => {
  console.clear();
  console.log("\nWelcome to THE MOST RANDOM QUIZ YOU WILL FIND!\n");
  showMenu();
  console.log("Bye bye ❤︎");
};

startApp();
