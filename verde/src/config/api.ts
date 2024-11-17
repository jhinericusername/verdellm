// config.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const endpoints = {
  chat: `${API_BASE}/api/chat`,
  chatgpt: `${API_BASE}/api/chatgpt`,
  compare: `${API_BASE}/api/compare`  // Add compare endpoint
};