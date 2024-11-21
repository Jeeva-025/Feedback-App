import React, { useState } from 'react'
import styled from 'styled-components'
import SignUp from './SignUp.jsx'
import SignIn from './SignIn.jsx';


const TextButton=styled.span`
color:#007bff;
cursor:pointer;
transition:all 0.3s ease;
font-weight:600;
`;
const Conatiner = styled.div`
display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  //justify-content: center; 
  align-items: center; 
  
`;
const Subcontainer=styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 1000px;
  align-items: center;  /* Center horizontally */
  justify-content: center;
  
`;
const Paragraph = styled.p`
  text-align: center; /* Center horizontally */
  margin-top: 10px; /* Adjust this value to control the space between SignUp/SignIn and the paragraph */
  font-size: 14px;
`;

const Authentication = () => {
    const[login, setLogin]=useState(true);


  return (
    <Conatiner>
        {login?
    <Subcontainer>
    <SignIn/>
    <Paragraph>Dont have an Account? <TextButton onClick={()=>setLogin(false)}>SignUP</TextButton></Paragraph>
    </Subcontainer>:<Subcontainer>
    <SignUp/>
    <Paragraph>Already have an Account? <TextButton  onClick={()=>setLogin(true)} >SignIN</TextButton></Paragraph>
    </Subcontainer>}
    </Conatiner>
  )
}

export default Authentication;