import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #e3c7c7;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const Link = styled.a`
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Paragraph = styled.p`
  margin-top: 10px;

  & a {
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
    //   localStorage.setItem('token', res.data.token);
    //   console.log('Token:', res.data.token);
    console.log(res.data.token);
    localStorage.setItem('token', res.data.token);
    
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // Display error to user
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
        <Input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
        <Button type="submit">Login</Button>
        <Link href='#'>Forgot password</Link>
        <Paragraph>Don't have an account? <Link href="/register">Sign up</Link></Paragraph>
      </Form>
    </LoginContainer>
  );
};

export default Login;
