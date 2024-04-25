// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    console.log("response is", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

export const updatePost = async (id, updates) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  }
};
