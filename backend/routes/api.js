var express = require('express');
var router = express.Router();
var verification_code = require('../controllers/verification_code');

/* GET users listing. */
router.post('/verify', function(req, res, next) {
  try {
    let email = req.body.email ? req.body.email : '';
    let code = req.body.code ? req.body.code : '';

    if (!email || !code) {
      res.status(400).send({
        'message': 'A parameter is missing'
      });
    } else {
      let verificationCode = new verification_code.VerificationCode(email, '');
      let response = verificationCode.verify(code);
      console.log(response);
      if (response['isCodeValid']) {
        res.status(200).send({
          'message': response['message']
        });
      } else {
        res.status(401).send({
          'message': response['message']
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      'message': 'An error has ocurred in the server, please contact to an administrator.'
    });
  }
});

router.post('/', function(req, res, next) {
  try {
    let email = req.body.email ? req.body.email : '';
    let phone = req.body.phone ? req.body.phone : '';

    if (!email || !phone) {
      res.status(400).send({
        'message': 'A parameter is missing'
      });
    }
    else {
      phone = phone.replace(/[\s-]/g, '');
      if (phone.length === 10) {
        phone = '+52' + phone;
      }
      let verificationCode = new verification_code.VerificationCode(email, phone);
      let code = verificationCode.generate();
      verificationCode.sendSms()
        .then(value => {
          if (value['success']) {
            res.status(200).send({
              'code': code,
              'message': ''
            });
          } else {
            res.status(202).send({
              'code': code,
              'message': value['message']
            });
          }
        });
    }
  } catch (err) {
    res.status(500).send({
      'message': 'An error has ocurred in the server, please contact to an administrator.'
    });
  }
});

module.exports = router;
