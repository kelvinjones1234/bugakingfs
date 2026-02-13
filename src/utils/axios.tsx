import axios from "axios";

// ==========================================
// 1. ENVIRONMENT CONFIGURATION
// ==========================================

// 🟢 STEP 1: Choose your mode ('development' or 'production')
// If you leave this as null, it automatically detects based on where it's running.
// const MANUAL_ENV = "development"; 
const MANUAL_ENV = "production"; 
 
// 🟢 STEP 2: Define your URLs here
const CONFIG = {
  development: {
    API_URL: "http://localhost:8000/api",
    IMAGE_URL: "http://localhost:8000",
  },
  production: {
    API_URL: "",
    IMAGE_URL: "https://bugaking.com.ng",
  },
};

// ==========================================
// 2. AUTOMATIC SELECTION LOGIC
// ==========================================

// Determines current environment (Priority: Manual Override > Node Env > Default to Dev)
const CURRENT_ENV =
  MANUAL_ENV || (process.env.NODE_ENV === "production" ? "production" : "development");

// Export constants based on the selection
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || CONFIG[CURRENT_ENV].API_URL;

export const IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || CONFIG[CURRENT_ENV].IMAGE_URL;

// 🟢 UPDATED: Cloudinary Base URL
// Replace 'dgjndnpam' with your actual cloud name if it is different.
export const CLOUDINARY_BASE = "https://res.cloudinary.com/dgjndnpam/image/upload/";

// ==========================================
// 3. AXIOS INSTANCE
// ==========================================

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper for debugging (prints to console so you know which API you are hitting)
console.log(`🚀 API Client initialized in ${CURRENT_ENV} mode: ${API_URL}`);