const API_URL = import.meta.env.VITE_API_URL || 'https://voicejournalapi-production-f73b.up.railway.app';

// Debug: Log the API URL on load
console.log('🔗 API_URL configured as:', API_URL);

// Transcription cache to improve performance
const transcriptionCache = new Map();

/**
 * Upload audio file for transcription
 */
export async function uploadAudio(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const uploadUrl = `${API_URL}/upload-audio`;
  console.log('📤 Uploading to:', uploadUrl);
  
  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    console.log('✅ Upload response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Upload error response:', errorText);
      throw new Error(`Upload failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('📦 Upload result:', result);
    return result;
  } catch (error) {
    console.error('💥 Audio upload error:', error);
    throw error;
  }
}

/**
 * Process transcription - FIXED to match backend signature
 */
export async function processTranscription(fileId: string, prompt?: string, title?: string) {
  try {
    // Backend expects title and prompt as query parameters
    let url = `${API_URL}/process-transcript/${fileId}`;
    const params = new URLSearchParams();
    
    if (prompt) params.append('prompt', prompt);
    if (title) params.append('title', title);
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    const response = await fetch(url, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }
    
    const result = await response.json();
    transcriptionCache.set(fileId, result);
    return result;
  } catch (error) {
    console.error('Processing error:', error);
    throw error;
  }
}

/**
 * Get transcription - FIXED endpoint name
 */
export async function getTranscription(fileId: string) {
  // Check cache first
  if (transcriptionCache.has(fileId)) {
    return transcriptionCache.get(fileId);
  }
  
  try {
    const response = await fetch(`${API_URL}/transcription/${fileId}`);
    if (!response.ok) {
      throw new Error(`Failed to get transcription: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Raw backend response:', result);
    
    // Map backend fields to frontend expectations
    const mappedResult = {
      id: result.file_id || result.id,
      title: result.title || 'Untitled',
      summary: result.analysis || result.summary || '',  // Map analysis → summary
      transcript: result.transcript 
        ? (Array.isArray(result.transcript) 
            ? result.transcript 
            : [{ timestamp: '00:00', text: result.transcript }])  // Convert string → array
        : []
    };
    
    console.log('Mapped result:', mappedResult);
    transcriptionCache.set(fileId, mappedResult);
    return mappedResult;
  } catch (error) {
    console.error(`Error fetching transcription ${fileId}:`, error);
    throw error;
  }
}

/**
 * Get all transcriptions - FIXED endpoint name
 */
export async function getAllTranscriptions() {
  try {
    const response = await fetch(`${API_URL}/transcriptions`); // ← Fixed
    if (!response.ok) {
      throw new Error(`Failed to get transcriptions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all transcriptions:', error);
    return []; // Return empty array on error to avoid breaking the UI
  }
}

/**
 * Get audio URL for a transcription
 */
export function getAudioUrl(fileId: string) {
  return `${API_URL}/audio/${fileId}`;
}

/**
 * Get URL for downloading summary text file
 */
export function getSummaryDownloadUrl(fileId: string) {
  return `${API_URL}/download-processed/${fileId}`;
}

/**
 * Delete transcription - FIXED endpoint name
 */
export async function deleteTranscription(fileId: string) {
  try {
    const response = await fetch(`${API_URL}/transcription/${fileId}`, { // ← Fixed
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }
    
    // Remove from cache if exists
    transcriptionCache.delete(fileId);
    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}