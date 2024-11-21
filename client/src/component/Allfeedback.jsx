// Allfeedback.js

import React, { useState, useEffect } from "react";
import { getAllFeedbacks, upvoteFeedback } from "../api/index";
import styled from "styled-components"; 
import Avatar from "@mui/material/Avatar";
import { IoMdArrowDropup } from "react-icons/io"




const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FeedbackCard = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeedbackImg = styled.div`
  width: 80px;  /* Small width for the image */
  height: 80px;  /* Small height for the image */
  border-radius: 10%;  /* Make it circular */
  overflow: hidden;  /* Ensure the image doesn't overflow */
  flex-shrink: 0;  /* Prevent shrinking */
`;

const Image = styled.img`
  width: 100%;  /* Make image take the full width of its container */
  height: 100%;  /* Make image take the full height of its container */
  object-fit: cover;  /* Ensure the image covers the area without distortion */
`;

const FeedbackContent = styled.div`
 font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  color: transparent;
`;

const FeedbackVote= styled.div`
display: flex;
  flex-direction: column;
  gap:10px;
`;

const Votes = styled.p`
  font-size: 0.9rem;
  color: #555;
  justify-content: center;
  margin-bottom: 15px;
`;

const VoteButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const Allfeedback = () => {

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFeedbacks = async () => {
    const token = localStorage.getItem("review-app");
      try {
        const res = await getAllFeedbacks(token); 
        setFeedbacks(res); 
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchFeedbacks(); 
  }, []); 


  
  const handleVote = async (id) => {
    const token = localStorage.getItem("review-app");
    try {
      const res = await upvoteFeedback(id, token); 
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((fb) =>
          fb._id === id ? { ...fb, votes: res.votes } : fb
        )
      ); 
    } catch (err) {
      console.log("Error upvoting feedback:", err); 
    }
  };

  

  if (loading) return <div>Loading...</div>;

  return (
    <FeedbackContainer>
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback._id}>
          <FeedbackImg>
            {/* Conditional rendering: Show image if available, else show Avatar */}
            {feedback.image ? (
              <Image src={feedback.image} alt="Feedback" />
            ) : (
              <Avatar src={feedback?.userEmail}>{feedback.userEmail ? feedback.userEmail[0] : "A"}</Avatar>
            )}
          </FeedbackImg>
          <FeedbackContent>{feedback.content}</FeedbackContent>
          <FeedbackVote>
          {/* <FaThumbsUp />
          <VoteButton onClick={() => handleVote(feedback._id)}>Vote</VoteButton> */}
          <VoteButton onClick={() => handleVote(feedback._id)}>
              <IoMdArrowDropup /> Vote
            </VoteButton>
          <Votes> {feedback.votes} Votes</Votes>
          
          </FeedbackVote>
        </FeedbackCard>
      ))}
    </FeedbackContainer>
  );
};

export default Allfeedback;
