const { showMenu } = require('./menu');

// This is the main entry point for the application.
const startApp = () => {
  console.clear();
  console.log('\nWelcome to PLAY A QUIZ OF YOUR CHOICE!\n');
  showMenu();
};

startApp();
