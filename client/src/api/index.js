import axios from "axios";


  const API = axios.create({
    baseURL: "https://feedback-app-sw35.onrender.com/api/",
  });
  
  
  export const UserSignUp = async (data) => {
    try {
      return await API.post("/user/signup", data);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  
  
  export const UserSignIn = async (data) => {
    try {
      return await API.post("/user/signin", data);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  //all feedbacks
  export const getAllFeedbacks = async (token) => {
    try {
      const response = await API.get("/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all feedbacks:", error);
      throw error;
    }
  };
  
  // logined person feedbacks
  export const getUserFeedbacks = async (token, userEmail) => {
    try {
      const response = await API.get(`/feedback/my?userEmail=${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      
      });
      return response.data;  // Return the feedback data
    } catch (error) {
      console.error("Error fetching user feedbacks:", error);
      throw error;
    }
  };
  
  
  //add a feedback
  export const addFeedback = async (token ,userEmail,content,image) => {
    try {
      const response = await API.post("/feedback", {userEmail, content, image}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding feedback:", error);
      throw error;
    }
  };

  
  // Update existing feedback
  export const updateFeedback = async (id, content, token) => {
    try {
      const response = await API.put(`/feedback/${id}`, { content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;

    } catch (error) {
      console.error("Error updating feedback:", error);
      throw error;
    }
  };
  
  // Delete feedback
  export const deleteFeedback = async (id, token) => {
    try {
      const response = await API.delete(`/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  };
  
  // Upvote a feedback
  export const upvoteFeedback = async (id, token) => {
    try {
      const response = await API.put(`/feedback/${id}/vote`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error upvoting feedback:", error);
      throw error;
    }
  };













  export const getDashboardDetails = async (token) => {
    try {
      return await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
      throw error;
    }
  };