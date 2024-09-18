import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./Home.css";
import HighScoreImg from "../Animation/HighScore.mp4.mp4";

const Home = () => {
  const [guessValue, setGuessValue] = useState('');
  const [randomValue, setRandomValue] = useState(generateRandomValue());
  const [count, setCount] = useState(0); // Tracks number of guesses
  const [hint, setHint] = useState('*Do the first guess to get a hint');
  const [won, setWon] = useState(false); // Tracks if user won
  const [newCounter, setNewCounter] = useState(0); // Score counter
  const [maxscore, setMaxScore] = useState(0); // Maximum score from database
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility

  const videoRef = useRef(null);

  // Fetch high score from the server
  const fetchHighScore = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getMaxScore", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      setMaxScore(response.data.maxScore); // Set the max score
    } catch (error) {
      console.error("Error fetching high score:", error);
    }
  };

  useEffect(() => {
    fetchHighScore();
  }, []); // Fetch the max score when the component mounts

  // Helper function to generate a random value
  function generateRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle guess button click
  const handleGuess = () => {
    let val = Number(guessValue);
    if (count <= 19) {
      getHint(val);
      increaseCounter();
    }
  };

  // Function to provide hints based on guess
  function getHint(val) {
    if (val >= 1 && val <= 100) {
      if (val === randomValue) {
        // User guessed the correct value
        setHint(`Congratulations, you guessed correctly! You have ${20 - count - 1} attempts left. Guess number Again`);
        setNewCounter(newCounter + 1); // Increase score
        setRandomValue(generateRandomValue()); // Generate a new random value
        setWon(true);
        if (newCounter + 1 > maxscore) {
          setShowVideo(true); // Show video if new score is higher
          setMaxScore(newCounter + 1); // Update maxScore
          saveMaxScore(newCounter + 1); // Save new max score
        }
      } else if (randomValue - val > 10) {
        setWon(false);
        setHint('Your guess is too low!');
      } else if (val - randomValue > 10) {
        setWon(false);
        setHint('Your guess is too high!');
      } else if (randomValue - val <= 10 && randomValue > val) {
        setWon(false);
        setHint('Your guess is slightly low!');
      } else if (val - randomValue <= 10 && val > randomValue) {
        setWon(false);
        setHint('Your guess is slightly high!');
      }
    } else {
      setWon(false);
      setHint('No hints for this value. Please enter a number between 1 and 100.');
    }
  }

  // Function to increase the guess counter
  function increaseCounter() {
    if (count < 19) {
      setCount(count + 1);
    } else {
      setCount(count + 1);
      setHint(`You've used all your chances! The answer was ${randomValue}`);
      saveMaxScore(maxscore); // Save max score when all attempts are used
    }
  }

  // Handle restart button click
  const handleRestart = () => {
    setRandomValue(generateRandomValue()); // New random value
    setCount(0); // Reset guess count
    setWon(false); // Reset win status
    setHint('*Do the first guess to get a hint');
    setGuessValue(''); // Clear input field
    setNewCounter(0); // Reset score counter
    setShowVideo(false); // Hide video on restart
  };

  // Function to save max score to the database
  const saveMaxScore = async (score) => {
    try {
      const response = await axios.post('http://localhost:5000/api/updateMaxScore', 
        { maxscore: score }, // Data to be sent
        { withCredentials: true } // Configuration options
      );
      console.log("Max score saved:", response.data);
    } catch (error) {
      console.error("Error saving max score:", error);
    }
  };

  // Show video for 8 seconds if the new score is higher
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
      const timer = setTimeout(() => {
        setShowVideo(false); // Hide video after 8 seconds
      }, 8000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [showVideo]);

  return (
    <div className='homepage'>
      <h1>Number Guessing Game</h1>
      <div className="upper">
        <p id="rules" style={{ fontWeight: "bold" }}>Rules</p>
        <ul style={{ listStyle: "none" }}>
          <li>&gt;&gt; Choose a value between 1 to 100</li>
          <li>&gt;&gt; You will be given only 20 attempts</li>
          <li>&gt;&gt; Optimize your guesses based on hints</li>
        </ul>
      </div>
      {showVideo && (
        <div>
          <video width="150" height="150" autoPlay muted ref={videoRef}>
            <source src={HighScoreImg} type="video/mp4"/>
           
          </video>
        </div>
      )}
      <div className='score'>Your Current Score</div>
      <div className='score'>{newCounter}</div>
      <div className="game">
        <input
          type="number"
          id="guessValue"
          placeholder="Your guess ..."
          value={guessValue}
          onChange={(e) => setGuessValue(e.target.value)}
        />
        &nbsp;
        <button type="button" className="btn" onClick={handleGuess}>
          Guess
        </button>
        <span id="counter">&nbsp;&nbsp; {count} Attempts</span>
        {won ? (
          <p id="hint" style={{ color: "green" }}>{hint}</p>
        ) : (
          <p id="hint">{hint}</p>
        )}
        <button className="btn" onClick={handleRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Home;
