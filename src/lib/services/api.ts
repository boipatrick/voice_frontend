// src/lib/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'https://voicejournalapi-production-f73b.up.railway.app';

/**
 * This stores processed transcriptions in memory (will be lost on page refresh)
 */
const transcriptionCache = new Map();

/**
 * Upload audio file for transcription
 */
export async function uploadAudio(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    // Changed endpoint to match your actual backend
    const response = await fetch(`${API_URL}/upload-audio`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    
    return await response.json(); // Should return file_id
  } catch (error) {
    console.error('Audio upload error:', error);
    throw error;
  }
}

/**
 * Process transcription by ID
 */
export async function processTranscription(fileId: string, prompt?: string) {
  try {
    // Using your actual process-transcript endpoint
    const response = await fetch(`${API_URL}/process-transcript/${fileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt || "Summarize this transcript" }),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }
    
    const result = await response.json();
    // Store in cache
    transcriptionCache.set(fileId, result);
    return result;
  } catch (error) {
    console.error('Processing error:', error);
    throw error;
  }
}

/**
 * Get transcription (from cache or download)
 */
export async function getTranscription(fileId: string) {
  // Check cache first
  if (transcriptionCache.has(fileId)) {
    return transcriptionCache.get(fileId);
  }
  
  // Otherwise try to download and process
  try {
    // Try to get processed file
    const response = await fetch(`${API_URL}/download-processed/${fileId}`);
    
    if (!response.ok) {
      // If not found, we might need to process it first
      return await processTranscription(fileId);
    }
    
    // Parse result
    const result = await response.json();
    transcriptionCache.set(fileId, result);
    return result;
  } catch (error) {
    console.error(`Error fetching transcription ${fileId}:`, error);
    throw error;
  }
}

/**
 * Get all transcriptions 
 */
export async function getAllTranscriptions() {
  try {
    // Return empty array or mock data for now
    // Later replace with actual API call when backend endpoint is available
    return [];
    
    // When backend endpoint is ready:
    // const response = await fetch(`${API_URL}/list-transcriptions`);
    // if (!response.ok) {
    //   throw new Error(`Failed to get transcriptions: ${response.status}`);
    // }
    // return await response.json();
  } catch (error) {
    console.error('Error fetching all transcriptions:', error);
    return []; // Return empty array on error to avoid breaking the UI
  }
}