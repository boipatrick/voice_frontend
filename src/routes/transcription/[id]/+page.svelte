<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getTranscription } from '$lib/services/api';
	import { goto } from '$app/navigation';

	interface TranscriptionItem {
		timestamp: string;
		text: string;
	}

	interface Transcription {
		summary: string;
		transcript: TranscriptionItem[];
	}

	const transcriptionId = $derived($page.params.id);
	let transcription: Transcription | null = $state(null);
	let isLoading = $state(true);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			if (!transcriptionId) {
				throw new Error('No transcription ID provided');
			}
			transcription = await getTranscription(transcriptionId);
			isLoading = false;
		} catch (err) {
			error = 'Failed to load transcription';
			isLoading = false;
		}
	});

	const goBack = () => {
		goto('/history');
	};

	const handleEdit = () => {
		alert('Edit functionality coming soon!');
	};

	const handleShare = () => {
		if (!transcription) return;
		if (navigator.share) {
			navigator.share({
				title: 'Transcription',
				text: transcription.summary
			});
		} else {
			navigator.clipboard.writeText(transcription.summary);
			alert('Copied to clipboard!');
		}
	};
</script>

<div class="transcription-page">
	<header class="header">
		<button class="icon-btn" onclick={goBack} aria-label="Go back">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</button>
		<h2>Transcription</h2>
		<div class="header-actions">
			<button class="icon-btn" onclick={handleEdit} aria-label="Edit">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
				</svg>
			</button>
			<button class="icon-btn" onclick={handleShare} aria-label="Share">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
					<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
				</svg>
			</button>
		</div>
	</header>

	<main class="main-content">
		{#if isLoading}
			<div class="loading">Loading transcription...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else if transcription}
			<!-- Display actual transcription data -->
			<div class="summary">
				<h2>Summary</h2>
				<p>{transcription.summary}</p>
			</div>
			
			<div class="full-transcript">
				<h2>Full Transcript</h2>
				<!-- Loop through transcription items -->
				{#each transcription.transcript || [] as item}
					<div class="transcript-item">
						<div class="timestamp">{item.timestamp}</div>
						<div class="text">{item.text}</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>

	<nav class="bottom-nav">
		<a href="/history" class="nav-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
			</svg>
			<span>Files</span>
		</a>
		
		<a href="/transcription/{transcriptionId}" class="nav-item active">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="16" y1="13" x2="8" y2="13" />
				<line x1="16" y1="17" x2="8" y2="17" />
				<polyline points="10 9 9 9 8 9" />
			</svg>
			<span>Transcription</span>
		</a>
		
		<a href="/settings" class="nav-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="3" />
				<path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H5m13.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
			</svg>
			<span>Settings</span>
		</a>
	</nav>
</div>

<style>
	.transcription-page {
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

	.icon-btn {
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

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.header h2 {
		font-size: 20px;
		font-weight: 600;
		margin: 0;
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-xs);
	}

	.main-content {
		padding: var(--spacing-xl) 0;
	}

	.loading {
		text-align: center;
		padding: var(--spacing-lg);
		font-size: 18px;
		color: var(--color-text-secondary);
	}

	.error {
		color: var(--color-danger);
		text-align: center;
		padding: var(--spacing-lg);
		font-size: 18px;
	}

	.summary {
		margin: 0 var(--spacing-lg);
		padding: var(--spacing-lg);
		background: var(--color-bg-card);
		border-radius: var(--radius-md);
		line-height: 1.6;
	}

	.summary h2 {
		margin: 0 0 var(--spacing-md) 0;
		font-size: 24px;
	}

	.summary p {
		margin: 0;
		color: var(--color-text-secondary);
	}

	.full-transcript {
		margin: 0 var(--spacing-lg);
		padding: var(--spacing-lg);
		background: var(--color-bg-card);
		border-radius: var(--radius-md);
		line-height: 1.6;
	}

	.transcript-item {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.timestamp {
		color: var(--color-primary);
		font-weight: 600;
		font-size: 14px;
		flex-shrink: 0;
		min-width: 50px;
	}

	.text {
		margin: 0;
		line-height: 1.6;
		color: var(--color-text-primary);
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(15, 31, 28, 0.95);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-around;
		padding: 12px 0;
		z-index: 100;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		color: var(--color-text-secondary);
		text-decoration: none;
		padding: 8px 24px;
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		min-width: 80px;
	}

	.nav-item span {
		font-size: 14px;
		font-weight: 500;
	}

	.nav-item.active {
		color: var(--color-primary);
		background: rgba(74, 222, 128, 0.1);
	}

	.nav-item:hover:not(.active) {
		color: var(--color-text-primary);
		background: rgba(255, 255, 255, 0.05);
	}
</style>