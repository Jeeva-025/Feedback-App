import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducer/userSlice';




const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: #007bff;
`;

const TextButton = styled.div`
  text-align: end;
  color: #6c757d;  
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: #007bff;  
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const Navlink = styled(Link)`
text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  color: #333;  
  transition: all 1s ease-in-out;
  white-space: nowrap;
  &.active {
    color: #fff; 
    background-color: #007bff; 
    border-radius: 5px; 
    padding: 5px 10px; 
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3); 
  }

  &:hover {
    color: #007bff; 
  }
`;

const Navbar = ({currentUser}) => {


  const dispatch = useDispatch();

  return (
    
    <NavContainer>
    <Navlink to="/">All Feedback List</Navlink>
    <Navlink to="/myfeed">Your Feedback List</Navlink>
    <UserContainer>
        <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
    </NavContainer>
  )
}

export default Navbar