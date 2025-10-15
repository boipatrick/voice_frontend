<script lang="ts">
    import { deleteTranscription } from '$lib/services/api';

    interface Props {
        id: string;
        title: string;
        timestamp: string;
        href: string;
        onDelete?: () => void;
    }

    let { id, title, timestamp, href, onDelete }: Props = $props();
    let isDeleting = $state(false);

    const handleDelete = async (e: MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();

        // Confirm deletion
        if (!confirm(`Delete "${title}"?\n\nThis action cannot be undone.`)) {
            return;
        }

        isDeleting = true;

        try {
            await deleteTranscription(id);
            
            // Call parent's onDelete callback to refresh list
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete transcription. Please try again.');
            isDeleting = false;
        }
    };
</script>

<div class="history-item-wrapper">
    <a {href} class="history-item">
        <div class="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        </div>
        <div class="content">
            <h4>{title}</h4>
            <p>{timestamp}</p>
        </div>
    </a>
    
    <button 
        class="delete-btn" 
        onclick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete transcription"
    >
        {#if isDeleting}
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
            </svg>
        {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        {/if}
    </button>
</div>

<style>
    .history-item-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .history-item {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-bg-card);
        border-radius: var(--radius-md);
        text-decoration: none;
        color: inherit;
        transition: all var(--transition-base);
    }

    .history-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
    }

    .icon {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-sm);
        background: rgba(74, 222, 128, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        flex-shrink: 0;
    }

    .content {
        flex: 1;
    }

    h4 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 4px 0;
        color: var(--color-text-primary);
    }

    p {
        font-size: 14px;
        margin: 0;
        color: var(--color-text-tertiary);
    }

    .delete-btn {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: var(--spacing-sm);
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        flex-shrink: 0;
        width: 40px;
        height: 40px;
    }

    .delete-btn:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.2);
        border-color: rgba(239, 68, 68, 0.5);
    }

    .delete-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>