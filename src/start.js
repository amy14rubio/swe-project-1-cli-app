const { showMenu } = require("./menu");

// This is the main entry point for the application.
const startApp = () => {
  console.clear();
  console.log("\nWelcome to a simple math quiz\n");
  showMenu();
};

startApp();
