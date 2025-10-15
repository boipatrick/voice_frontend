<script lang="ts">
    import BottomNav from '$lib/components/BottomNav.svelte';
    import DropZone from '$lib/components/DropZone.svelte';
    import { goto } from '$app/navigation';
    import { uploadAudio } from '$lib/services/api';

    let isUploading = $state(false);
    let uploadError = $state('');

    const handleFileSelect = async (file: File) => {
        console.log('File selected:', file.name);
        
        // Reset error state
        uploadError = '';
        isUploading = true;

        try {
            // Call backend API to upload the file
            const response = await uploadAudio(file);
            console.log('Upload response:', response);
            
            // Navigate to transcribing page with the file_id from backend
            goto(`/transcribing?file_id=${response.file_id}&filename=${encodeURIComponent(file.name)}`);
        } catch (error) {
            console.error('Upload failed:', error);
            uploadError = error instanceof Error ? error.message : 'Upload failed. Please try again.';
            isUploading = false;
        }
    };

    const goBack = () => {
        goto('/');
    };
</script>

<div class="upload-page">
    <header class="header">
        <button class="back-btn" onclick={goBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </button>
        <h2>Upload</h2>
        <div class="spacer"></div>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>Upload your audio</h1>
            <p class="subtitle">
                Drag and drop your audio file here or select from your device
            </p>

            {#if uploadError}
                <div class="error-message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {uploadError}
                </div>
            {/if}

            {#if isUploading}
                <div class="uploading-state">
                    <div class="spinner"></div>
                    <p>Uploading your audio file...</p>
                </div>
            {:else}
                <DropZone onFileSelect={handleFileSelect} />
            {/if}
        </div>
    </main>

    <BottomNav activeTab="upload" />
</div>

<style>
    .upload-page {
        min-height: 100vh;
        padding-bottom: 100px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-lg);
        position: sticky;
        top: 0;
        background: rgba(15, 31, 28, 0.95);
        backdrop-filter: blur(10px);
        z-index: 10;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .back-btn {
        background: none;
        border: none;
        color: var(--color-text-primary);
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        transition: background var(--transition-fast);
    }

    .back-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .header h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }

    .spacer {
        width: 40px;
    }

    .main-content {
        padding: var(--spacing-xl) 0;
    }

    h1 {
        text-align: center;
        margin-bottom: var(--spacing-md);
    }

    .subtitle {
        text-align: center;
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xl);
        font-size: 16px;
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: #ef4444;
    }

    .uploading-state {
        text-align: center;
        padding: var(--spacing-xl);
    }

    .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-top-color: var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto var(--spacing-md);
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .uploading-state p {
        color: var(--color-text-secondary);
    }
</style>