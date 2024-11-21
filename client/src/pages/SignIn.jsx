import React, { useState } from "react";
import styled from "styled-components";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background: white;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;
const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;


const SignIn = () => {

  const dispatch=useDispatch();
  
  const [error, setError] = useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);


  const validateInputs = () => {
    
    if (!email || !password) {
      setError("All fields are required!");
      return false;
    }
    setError("");
    return true;
  };


  const handelSignIn = async (e) => {
    e.preventDefault();
    
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          console.log(res);
        
          dispatch(loginSuccess(res.data));
          setError("Login Success");
          alert("Login Success");
          
        })
        .catch((err) => {
          alert(err?.response?.data?.message);
          
        });
    }
  };


  return (
    <Container>
      <Form onSubmit={handelSignIn}>
        <Title>Sign In</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
       <PasswordWrapper>
        <Input
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <EyeIcon onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </PasswordWrapper>

        <Button type="submit">Sign In</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
