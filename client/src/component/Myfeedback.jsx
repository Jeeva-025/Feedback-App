import React, { useState, useEffect } from "react";
import axios from "axios";
import { addFeedback, deleteFeedback, getUserFeedbacks, updateFeedback } from "../api/index";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

const Container=styled.div`
display: flex;
  flex-direction: row;  /* Align children horizontally */
  justify-content: space-between;  /* Distribute space between children */
  max-width: 1400px;  /* Adjust container width as needed */
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: "Arial", sans-serif;
`;

const FeedbackContainer = styled.div`
  flex: 1;  /* Make it take up available space */
  max-width: 600px;  /* Adjust width as needed */
  margin-right: 20px;  /* Add some space to the right */
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: "Arial", sans-serif;
  height: 600px;
  overflow-y: auto; 
`;
const FeedbackImg = styled.div`
  width: 90px;  /* Small width for the image */
  height: 90px;  /* Small height for the image */
  border-radius: 10%;  /* Make it circular */
  overflow: hidden; /* Ensure the image doesn't overflow */
  flex-shrink: 0;  /* Prevent shrinking */
`;
const Image = styled.img`
  width: 100%;  /* Make image take the full width of its container */
  height: 100%;  /* Make image take the full height of its container */
  object-fit: cover;  /* Ensure the image covers the area without distortion */
`;

const FeedbackHeading = styled.h2`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FeedbackItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  display:flex;
  flex-direction:row;
  gap:27px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;
const FeedbackCel=styled.div`
diplay:flex;
flex-direction:column;
gap:20px;
`;

const FeedbackContent = styled.p`
  margin: 0 0 10px;
  font-size: 1rem;
  color: #444;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:nth-child(2) {
    background-color: #dc3545;

    &:hover {
      background-color: #a71d2a;
    }
  }

  &:nth-child(3) {
    background-color: #6c757d;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

const PostFeedbackContainer = styled.div`
  flex: 1;  /* Make it take up available space */
  max-width: 600px;  /* Adjust width as needed */
  margin-left: 20px;  /* Add some space to the left */
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: "Arial", sans-serif;
`;

const PostHeading = styled.h3`
  font-size: 1.3rem;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const MyFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const[loading, setLoading]=useState(true);
  const[userEmail, setUserEmail]=useState("");
  const[imgURL, setImgURL ]=useState("");
  const[newContent,setNewContent]=useState("");
  const [file, setFile] = useState(null);

  
  const { currentUser } = useSelector((state) => state.user);
   

  useEffect(() => {
   const fetchFeedbacks = async () => {
    const token = localStorage.getItem("review-app");
    const userEmail =currentUser?.email;
    try{
      const res= await getUserFeedbacks(token, userEmail);
      setFeedbacks(res);
    }catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false); 
    }
  }

  fetchFeedbacks();
},[]);


  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditedContent(content);
  };


  const handleSave = async(id) => {
    console.log(id)
    const token = localStorage.getItem("review-app");
    try{
    const res=await updateFeedback(id, editedContent, token);
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((fb) =>
        fb._id === id ? { ...fb, content: res.content } : fb)
    ); 
    setEditingId(null);
  } catch(err){
    console.log(err)
  }
  };


  const handleDelete = async(id) => {

    const token=localStorage.getItem("review-app");
    try{
      const res=await deleteFeedback(id, token);
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    }catch(err){
      console.log(err.message);
    }
  };


  const handleSubmit = async () => {
    const token = localStorage.getItem("review-app");
    const userEmail =currentUser?.email;
    try {
      const res = await addFeedback(token, userEmail, newContent, imgURL);
      setFeedbacks((prev) => [...prev, res]);
      
      setNewContent("");
      setImgURL("");
      setFile(null);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  

  if (loading) return <div>Loading...</div>;
console.log(feedbacks)
  return (
    <Container>

    <FeedbackContainer>
      {/* Shows all feed back particular person who logged in and with edit and delete function*/}
      <FeedbackHeading>Your Feedbacks</FeedbackHeading>
      {feedbacks.map((feedback) => (

        <FeedbackItem key={feedback._id}>

          <FeedbackImg>
            {feedback.image ? (
              <Image src={feedback.image} alt="Feedback" />
              ) : (
              <Avatar src={feedback?.userEmail}>{feedback.userEmail ? feedback.userEmail[0] : "A"}</Avatar>
            )}
          </FeedbackImg>

          {editingId === feedback._id ? (
            <div>
            <TextArea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}/>
              <ButtonGroup>
                <Button onClick={() => handleSave(feedback._id)}>Save</Button>
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              </ButtonGroup>
              </div>
          ) : (
            <div>
              <FeedbackContent>{feedback.content}</FeedbackContent>
              <ButtonGroup>
                <Button onClick={() => handleEdit(feedback._id, feedback.content)}>Edit</Button>
                <Button onClick={() => handleDelete(feedback._id)}>Delete</Button>
              </ButtonGroup>

            </div>
          )}
        </FeedbackItem>
      ))}
      </FeedbackContainer>

<PostFeedbackContainer>
  <PostHeading>Share your feedback here</PostHeading>

        {/* Forrm to post feedback */}
  
        <TextArea
          name="newContent"
          placeholder="Input Box"
          value={newContent}
          onChange={(e)=>setNewContent(e.target.value)}
        />
        
        <TextArea
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={imgURL}
          onChange={(e)=>setImgURL(e.target.value)}
        />
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
         Upload an fields (optional):
        </label>
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: '10px' }}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
</PostFeedbackContainer>
</Container>
  );
};

export default MyFeedback;
