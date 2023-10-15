const handleAsync = require("../common/handle-async")
const { body, validationResult } = require('express-validator');
const express = require("express");

module.exports = class WelcomeController {
  static actionIndex(_, response) {
    response.render('welcome');
  }

  static actionAsync = handleAsync(async function(req, res) {
    await new Promise(r => setTimeout(r, 2000)); // test sleep for 2 seconds, simulate awaits
    // throw new Error("STOP!");  // Uncomment this line, to test Error handling
    res.send("OK");
  })

  static validateLogin = [
      express.json(),
      body('username').notEmpty().withMessage('required'),
      body('username').isEmail().withMessage('Invalid username'),
      body('username').notEmpty().withMessage('required'),
      body('password').isLength({min: 8}).withMessage('Password should be at least 8 chars')
  ]

  static actionAsyncLogin = handleAsync(async function(request, response) {

    const validated = validationResult(request);
    console.log(validated.array())
    if (validated.isEmpty()) {
      response.json(request.body)
      return;
    }

    response.status(400).json({
      errors: validated.array()
    })
  })

  // const expressFileUpload = require("express-fileupload");
  // app.use(expressFileUpload());
  // req.files.user_pic

};
