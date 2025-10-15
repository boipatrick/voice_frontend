<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { processTranscription } from '$lib/services/api';
    import BottomNav from '$lib/components/BottomNav.svelte';
    import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';

    // Get file_id and filename from URL params
    const fileId = $derived($page.url.searchParams.get('file_id'));
    const filename = $derived($page.url.searchParams.get('filename') ?? undefined);

    let progress = $state(0);
    let status = $state('Uploading to server...');
    let error = $state('');

    onMount(() => {
        // Start progress animation
        const progressInterval = setInterval(() => {
            if (progress < 90) {
                progress += 2;
            }
        }, 300);

        // Validate we have a file_id
        if (!fileId) {
            error = 'No file ID provided';
            return () => clearInterval(progressInterval);
        }

        // Start async processing
        (async () => {
            try {
                // Update status
                status = 'Processing audio with Azure...';
                
                // Call backend to process transcription
                const result = await processTranscription(fileId, undefined, filename);
                
                // Complete progress
                progress = 100;
                status = 'Transcription complete!';
                
                console.log('Transcription result:', result);
                
                // Clear interval
                clearInterval(progressInterval);
                
                // Navigate to transcription page after a short delay
                setTimeout(() => {
                    goto(`/transcription/${fileId}`);
                }, 800);
                
            } catch (err) {
                clearInterval(progressInterval);
                console.error('Transcription error:', err);
                error = err instanceof Error ? err.message : 'Transcription failed. Please try again.';
                status = 'Error occurred';
            }
        })();

        return () => clearInterval(progressInterval);
    });

    const handleClose = () => {
        goto('/upload');
    };

    const handleRetry = () => {
        window.location.reload();
    };
</script>

<div class="transcribing-page">
    <header class="header">
        <button class="close-btn" onclick={handleClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
        <h2>Transcribing</h2>
        <div class="spacer"></div>
    </header>

    <main class="main-content">
        <div class="container">
            {#if error}
                <div class="error-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <h1>Transcription Failed</h1>
                    <p class="error-message">{error}</p>
                    <div class="button-group">
                        <button class="retry-btn" onclick={handleRetry}>
                            Try Again
                        </button>
                        <button class="secondary-btn" onclick={handleClose}>
                            Go Back
                        </button>
                    </div>
                </div>
            {:else}
                <ProgressIndicator {progress} />

                <h1>Transcription in progress...</h1>
                <p class="subtitle">{status}</p>
                {#if filename}
                    <p class="filename">Processing: {filename}</p>
                {/if}

                <ProgressBar {progress} />
            {/if}
        </div>
    </main>

    <BottomNav activeTab="history" />
</div>

<style>
    .transcribing-page {
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

    .close-btn {
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

    .close-btn:hover {
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
        padding: var(--spacing-xl) var(--spacing-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 200px);
    }

    .container {
        text-align: center;
        width: 100%;
        max-width: 600px;
    }

    h1 {
        margin: var(--spacing-xl) 0 var(--spacing-md);
        font-size: 28px;
    }

    .subtitle {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-md);
        font-size: 16px;
        line-height: 1.6;
    }

    .filename {
        color: var(--color-text-secondary);
        font-size: 14px;
        margin-bottom: var(--spacing-xl);
        font-style: italic;
    }

    .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
    }

    .error-state svg {
        color: var(--color-danger);
        margin-bottom: var(--spacing-md);
    }

    .error-message {
        color: var(--color-danger);
        font-size: 16px;
        margin-bottom: var(--spacing-lg);
    }

    .button-group {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
    }

    .retry-btn {
        background: var(--color-primary);
        color: var(--color-bg-primary);
        border: none;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: opacity var(--transition-fast);
    }

    .retry-btn:hover {
        opacity: 0.9;
    }

    .secondary-btn {
        background: transparent;
        color: var(--color-text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: background var(--transition-fast);
    }

    .secondary-btn:hover {
        background: rgba(255, 255, 255, 0.05);
    }
</style>