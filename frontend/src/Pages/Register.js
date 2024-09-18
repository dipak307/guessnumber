import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
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
  background-color: pink;
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

const Paragraph = styled.p`
  margin-top: 10px;

  & a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful:', res.data);
      if (res.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      // Display error to user
    }
  };

  return (
    <SignupContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Button type="submit">Sign Up</Button>
        <Paragraph>
          Already have an account? <a href="/login">Login</a>
        </Paragraph>
      </Form>
    </SignupContainer>
  );
};

export default Register;
