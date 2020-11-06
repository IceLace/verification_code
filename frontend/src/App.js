import React, { useState } from 'react';
import './App.css';

var App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeAsked, setIsCodeAsked] = useState(false);
  const [code, setCode] = useState('');
  const rePhone = new RegExp(
    '^(\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]' +
    '?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d)|' +
    '(\\d\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?' +
    '\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d[\\s-]?\\d)$'
  );

  var getCode = async () => {

    let validateEmail = (email) => {
      const re = /^[a-zA-Z0-9_.-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      return re.test(email);
    }

    let validatePhone = (phone) => {
      return phone.match(rePhone);
    }
    
    if (email.match(new RegExp('yahoo.com'))){
      setMessage('Email must no have yahoo.com');
    } else if (!validateEmail(email)) {
      setMessage('Email is not valid');
    } else if (!validatePhone(phone)) {
      setMessage('The phone has an invalid format');
    } else {
      let data = {
        email: email,
        phone: phone
      };
      
      let response = await fetch("http://localhost:9000/verification-code", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let jdata = await response.json();
      if (response.status === 200) {
        setIsCodeAsked(true);
        setMessage('');
      } else if (response.status === 202) {
        setIsCodeAsked(true);
        setMessage('');
        console.log(jdata.message);
      } else if (response.status === 500) {
        setMessage(jdata.message);
      }

    }
  }

  var verifyCode = async () => {
    
    
    if (code.length !== 4 && code.length !== 6 && code.length !== 8 ){
      setMessage('The verification code has an invalid format');
    } else {
      let data = {
        email: email,
        phone: phone,
        code: code
      };
      
      let res = await fetch("http://localhost:9000/verification-code/verify", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let jdata = await res.json();
      setMessage(jdata.message);
    }
  }

  let loginComponent = 
    <div className="App">
      <header className="App-header">
        <p>VERIFICATION CODE</p>
        <input
          id='email'
          className="App-input"
          type='text'
          onChange={event => setEmail(event.target.value)}
          value = {email}
          placeholder='email'>
        </input>
        <input
          id='phone'
          className="App-input"
          type='text'
          onChange={event => setPhone(event.target.value)}
          value = {phone}
          placeholder='phone'>
        </input>
        <button onClick={getCode}>LOGIN</button>
        <br/>
        <br/>
        <br/>
        <p>{message}</p>
      </header>
    </div>;
  
  let codeComponent = 
    <div className="App">
      <header className="App-header">
        <p>VERIFICATION CODE</p>
        <input
          id='code'
          className="App-input"
          type='text'
          onChange={event => setCode(event.target.value)}
          value = {code}
          placeholder='code'>
        </input>
        <button onClick={verifyCode}>LOGIN</button>
        <button onClick={getCode}>RESEND CODE</button>
        <br/>
        <br/>
        <br/>
        <p>{message}</p>
      </header>
    </div>;

  let wrappedComponent = isCodeAsked ? codeComponent : loginComponent;

  return (wrappedComponent);
}

export default App;
