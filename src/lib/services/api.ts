// src/lib/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'https://voicejournalapi-production-f73b.up.railway.app';

/**
 * Upload audio file for transcription
 */
export async function uploadAudio(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(`${API_URL}/transcribe`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Audio upload error:', error);
    throw error;
  }
}

/**
 * Get transcription by ID
 */
export async function getTranscription(id: string) {
  try {
    const response = await fetch(`${API_URL}/transcription/${id}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get transcription: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching transcription ${id}:`, error);
    throw error;
  }
}

/**
 * Get all transcriptions
 */
export async function getAllTranscriptions() {
  try {
    const response = await fetch(`${API_URL}/transcriptions`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get transcriptions: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching all transcriptions:', error);
    throw error;
  }
}