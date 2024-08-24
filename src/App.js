import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header.js'
import Menu from './components/Menu.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AskQuery from './components/AskQuery';
import AllQueries from './components/AllQueries';
import LoginSignup from './components/LoginSignup/LoginSignup.js';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [email, setEmail] = useState('');

  function handleLoginSuccess() {
    setLoginSuccess(true);
  }

  return (
    <div>
      <Router>
        {loginSuccess ? (
          <Container>
            <Header />
            <Row>
              <Col md={4}><Menu /></Col>
              <Col md={8}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/askQuery" element={<AskQuery email={email} setEmail={setEmail}/>} />
                  <Route path="/view-queries" element={<AllQueries />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        ) : (
          <LoginSignup 
            loginSuccess={loginSuccess} 
            setLoginSuccess={setLoginSuccess} 
            email={email} 
            setEmail={setEmail} 
            onLoginSuccess={handleLoginSuccess} // Pass callback function
          />
        )}
      </Router>
    </div>
  );
}

export default App;