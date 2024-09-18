import React, { useEffect, useState } from "react";
import styled from "styled-components";
import avatar from "../Animation/usericon.png";
import { MdLeaderboard } from 'react-icons/md';
import {FaHome} from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navigation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [highScore, setHighScore] = useState(0);

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    const fetchHighScore = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getMaxScore", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        });
        setHighScore(response.data.maxScore);
      } catch (error) {
        console.error("Error fetching high score:", error);
      }
    };

    fetchHighScore();
  }, []);

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="img" />
        <div className="text">
          <h2>Welcome Back</h2>
          <p>Mr/Ms. {userData.email}</p>
        </div>
      </div>

      <ul className="menu-items">
        <div>
          <h5>Your High Score</h5>
          <h5>{highScore}</h5>
        </div>
        {/* Use NavLink for navigation */}
        <li>
          <NavLink to="/leaderboard" className="nav-link" activeClassName="active">
            <MdLeaderboard style={{ color: "green"}} /> Leaderboard
          </NavLink>
          <NavLink to="/" className="nav-link" activeClassName="active">
            <FaHome style={{ color: "green"}} /> Home
          </NavLink>
        </li>
      </ul>

      <div className="bottom-nav">
        <li style={{ listStyle: "none" }} onClick={logout}>
          <FaSignOutAlt /> Sign Out
        </li>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 350px;
  height: 85vh;
  background: linear-gradient(135deg, #f8b195, #f67280); /* Subtle gradient */
  border: none;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  gap: 2rem;
  position: fixed; /* Keeps the navigation bar fixed to the left side */

  .user-con {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: #fff;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
    }

    .text {
      h2 {
        color: #2d3436;
        font-size: 1.5rem;
        margin: 0;
      }
      p {
        color: #636e72;
        font-size: 1rem;
        margin: 0;
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      background-color: #ffffff;
      padding: 1rem;
      border-radius: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;

      h5 {
        margin: 0;
        color: #2d3436;
        font-weight: bold;
      }
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
      cursor: pointer;
      color: #ffffff;
      padding: 0.8rem 1rem;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      transition: background 0.3s ease-in-out;

      svg {
        font-size: 1.4rem;
        color: #ffffff;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      a {
        text-decoration: none;
        color: inherit;
        font-size: 1.1rem;
      }
    }
  }

  .active {
    background: rgba(255, 255, 255, 0.3);
    svg {
      color: #74b9ff;
    }
  }

  .bottom-nav {
    text-align: center;
    li {
      list-style: none;
      color: #ffffff;
      cursor: pointer;
      padding: 0.8rem 1rem;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      transition: background 0.3s ease-in-out;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      svg {
        font-size: 1.4rem;
        margin-right: 0.5rem;
      }
    }
  }
`;


export default Navigation; 
