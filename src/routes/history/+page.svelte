<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import FilterPill from '$lib/components/FilterPill.svelte';
	import HistoryItem from '$lib/components/HistoryItem.svelte';
	import { onMount } from 'svelte';
	import { getAllTranscriptions } from '$lib/services/api';

	interface Transcription {
		id: string;
		title: string;
		timestamp: string;
	}
	let transcriptions = $state<Transcription[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let searchQuery = $state('');
	let activeFilter = $state('all');

	onMount(async () => {
		try {
			transcriptions = await getAllTranscriptions();
			isLoading = false;
		} catch (err) {
			error = 'Failed to load transcription history';
			isLoading = false;
		}
	});

	const filteredItems = $derived(
		transcriptions.filter(item =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<div class="history-page">
	<header class="header">
		<h2>History</h2>
		<a href="/settings" class="settings-btn" aria-label="Settings">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="3" />
				<path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H5m13.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
			</svg>
		</a>
	</header>

	<main class="main-content">
		<div class="container">
			<div class="search-bar">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<input
					type="text"
					placeholder="Search"
					bind:value={searchQuery}
				/>
			</div>

			<div class="filters">
				<FilterPill active={activeFilter === 'all'} onclick={() => activeFilter = 'all'}>
					All
				</FilterPill>
				<FilterPill active={activeFilter === 'transcriptions'} onclick={() => activeFilter = 'transcriptions'}>
					Transcriptions
				</FilterPill>
				<FilterPill active={activeFilter === 'summaries'} onclick={() => activeFilter = 'summaries'}>
					Summaries
				</FilterPill>
			</div>

			{#if isLoading}
				<div class="loading">Loading history...</div>
			{:else if error}
				<div class="error">{error}</div>
			{:else if transcriptions.length === 0}
				<div class="empty-state">No transcriptions yet</div>
			{:else}
				<div class="history-list">
					{#each filteredItems as item (item.id)}
						<HistoryItem
							title={item.title}
							timestamp={item.timestamp}
							href="/transcription/{item.id}"
						/>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<BottomNav activeTab="history" />
</div>

<style>
	.history-page {
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

	.header h2 {
		font-size: 24px;
		font-weight: 600;
		margin: 0;
	}

	.settings-btn {
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
		text-decoration: none;
	}

	.settings-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.main-content {
		padding: var(--spacing-lg);
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-bg-card);
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-lg);
	}

	.search-bar svg {
		color: var(--color-text-secondary);
		flex-shrink: 0;
	}

	.search-bar input {
		flex: 1;
		background: none;
		border: none;
		color: var(--color-text-primary);
		font-size: 16px;
		font-family: inherit;
		outline: none;
	}

	.search-bar input::placeholder {
		color: var(--color-text-secondary);
	}

	.filters {
		display: flex;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-xl);
		overflow-x: auto;
		padding-bottom: 4px;
	}

	.filters::-webkit-scrollbar {
		height: 4px;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.loading, .error, .empty-state {
		text-align: center;
		color: var(--color-text-secondary);
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
		background: var(--color-bg-card);
		margin-bottom: var(--spacing-lg);
	}
</style>