class VerificationCode {

  constructor(email, phone) {
    this.email = email;
    this.phone = phone;
    this.code = '';
  }

  generate() {
    if (this.email.match(new RegExp('rever')) && this.email.match(new RegExp('score'))) {
      this.code = Math.floor(10000000 + Math.random() * 90000000) + '';
    } else if (this.email.match(new RegExp('rever'))) {
      this.code = Math.floor(1000 + Math.random() * 9000) + '';
    } else if (this.email.match(new RegExp('score'))) {
      this.code = Math.floor(100000 + Math.random() * 900000) + '';
    } else {
      this.code = Math.floor(1000 + Math.random() * 9000) + '';
    }

    global.localStorage.setItem(this.email, this.code);
    return this.code;
  }

  verify(code) {

    if (code === global.localStorage.getItem(this.email)) {
      return {
        'isCodeValid': true,
        'message': 'Hi <email>, you have been verified!'.replace(/<email>/g, this.email)
      };
    } else {
      return {
        'isCodeValid': false,
        'message': ('Hi <email>, the verification code does not match the one we sent to you. ' +
          'Please try again')
          .replace(/<email>/g, this.email)
      };
    }
  }

  async sendSms() {
    const message = 'Hi <email>! Your verification code for Rever is <code>. ' +
      'We are sending you this notification through our <messaging mechanism> subsystem.';

    const twilioNumber = '+12058966377';
    const accountSid = 'ACdd1399eb96390b9fa805cae071c28a50'; 
    const authToken = '4ab5e54293488427f598a861a4b56c15';
    const client = require('twilio')(accountSid, authToken);

    let body = message
      .replace(/<email>/g, this.email)
      .replace(/<code>/g, this.code)
      .replace(/<messaging mechanism>/g, 'SMS');

    let response = client.messages
      .create({
        body: body,
        from: twilioNumber,       
        to: this.phone
      })
      .then(response => {
        return {
          'success': true,
          'message': ''
        }
      })
      .catch(response => {
        body = message
          .replace(/<email>/g, this.email)
          .replace(/<code>/g, this.code)
          .replace(/<messaging mechanism>/g, 'Console');
        return {
          'success': false,
          'message': body
        }
      })

    return response;
  }
}

module.exports.VerificationCode = VerificationCode;