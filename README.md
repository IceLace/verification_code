# verification_code
Example to implement a verification code using node js for backend and react for frontend. For sending sms is using twilio, so is neccesary to set keys in /backend/controllers/verification_code.js, lines 45-47

* const twilioNumber = '<TWILIO_PHONE_NUMBER>';
* const accountSid = '<TWILIO_ACCOUNT_ID>'; 
* const authToken = '<TWILIO_TOKEN>';

A [diagram](https://github.com/IceLace/verification_code/blob/main/verification%20code.png "Diagram") of the algorithm can be found in the repository.

## To Execute backend open a new terminal:
1. cd backend
2. npm install
3. npm start

* Backend is executed in port 9000

## To Execute Frontend open a new terminal:
1. cd frontend
2. npm install
3. npm start

* Frontend is executed in port 3000

## API endpoints:
### [POST] /verification-code
  request: {email: 'email@domain.com', phone: '111 222 3333'}
  response: {code: 'code', message: 'message for user if sms systems failed'}
  status:
    * 200 - sms sended sucessfuly
    * 202 - code returned to be showed in user's console
    * 500 - server error
  
### [POST] /verification-code/verify
  request: {email: 'email@domain.com', code: '12345'}
  response: {message: 'message for user if verifications was sucess or not'}
  status:
    * 200 - code verified succesfuly
    * 401 - code not valid for that email
    * 500 - server error

## Testing
Project includes mocha for backend, to execute it open a new terminal:
1. cd backend
2. npm test
