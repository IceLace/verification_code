
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var assert = require('assert');
chai.use(chaiHttp);
const url= 'http://localhost:9000';

describe('REST API: ', () => {
  describe('VerificationCode: ', () => {
    it('Sending succesfully a verification code by sms', async () => {
     const res = await chai.request(url)
      .post('/verification-code')
      .send({email:'irving@test.com', phone: "4921729808"})

      assert.strictEqual(res.status, 200);
    });

    it('Sending succesfully a verification code by sms using country code', async () => {
      const res = await chai.request(url)
       .post('/verification-code')
       .send({email:'irving@test.com', phone: "+524921729808"})
 
       assert.strictEqual(res.status, 200);
     });

    it('Sending succesfully a verification code by terminal (by sending an invalid phone number)', async () => {
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email:'irving@test.com', phone: "1234567890"})
 
        assert.strictEqual(res.status, 202);
     });

    it('Getting code of 4 digits for rever', async () => {
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email:'irving@rever.com', phone: "1234567890"})
 
      if (res.status === 200 || res.status === 202) {
        let jdata = await res.body;
        assert.strictEqual(jdata.code.length, 4);
      }
    });

    it('Getting code of 6 digits for score', async () => {
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email:'irving@score.com', phone: "1234567890"})
 
      if (res.status === 200 || res.status === 202) {
        let jdata = await res.body;
        assert.strictEqual(jdata.code.length, 6);
      }
    });

    it('Getting code of 8 digits for rever and score', async () => {
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email:'irving@reverscore.com', phone: "1234567890"})
 
      if (res.status === 200 || res.status === 202) {
        let jdata = await res.body;
        assert.strictEqual(jdata.code.length, 8);
      }
    });

    it('getting code and veryfing code succesfully', async () => {
      const email = 'irving@test.com';
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email: email, phone: "1234567890"})
 
      if (res.status === 200 || res.status === 202) {
        let jdata = await res.body;

        const res2 = await chai.request(url)
          .post('/verification-code/verify')
          .send({email: email, phone: "1234567890", code: jdata.code})

        assert.strictEqual(res2.status, 200);
      }
    });

    it('getting code and veryfing code unsuccesfully', async () => {
      const email = 'irving@test.com';
      const res = await chai.request(url)
        .post('/verification-code')
        .send({email: email, phone: "1234567890"})
 
      if (res.status === 200 || res.status === 202) {
        let jdata = await res.body;

        const res2 = await chai.request(url)
          .post('/verification-code/verify')
          .send({email: email, phone: "1234567890", code: '0000'})

        assert.strictEqual(res2.status, 401);
      }
    });

  });
});
 
 