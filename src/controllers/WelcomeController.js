const catchAsync = require("../common/catch-async")

module.exports = class WelcomeController {
  static actionIndex(_, response) {
    response.render('welcome');
  }

  static actionAsync = catchAsync(async function(req, res) {
    await new Promise(r => setTimeout(r, 2000)); // test sleep for 2 seconds, simulate awaits
    // throw new Error("STOP!");  // Uncomment this line, to test Error handling
    res.send("OK");
  })

};
