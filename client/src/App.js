
import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication.jsx';
import Allfeedback from './component/Allfeedback.jsx';
import Myfeedback from './component/Myfeedback.jsx';
import Navbar from './component/Navbar.jsx';
import { useSelector } from 'react-redux';


const Container=styled.div`
 background: #f5f5f5;
  color: #333; /* Change text color to make it readable */
  height: 100vh;
  overflow-x: hidden; /* Corrected typo here */
  overflow-y: scroll;
  transition: all 0.2s ease;
  position: relative;
`;

  const Nav=styled.div`
  position: sticky; /* Use sticky only once */
  top: 0;
   background-color: #f9f9f9;
  `;

function App() {

  

  const { currentUser } = useSelector((state) => state.user);
  
  

  return (
  <BrowserRouter>
  {currentUser? 
    <Container>
      <Nav>
    <Navbar  currentUser={currentUser}/>
    </Nav>
    <Routes>
    <Route path="/" exact element={<Allfeedback/>}/>
    <Route path="/myfeed"  element={<Myfeedback/>}/>
    </Routes>
  </Container>
  :<Authentication/>
  }
   
  </BrowserRouter>
    
  );
}

export default App;
