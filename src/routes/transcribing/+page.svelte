<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	let progress = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			progress += 5;
			if (progress >= 100) {
				clearInterval(interval);
				setTimeout(() => {
					// Create a mock transcription and navigate
					const transcriptionId = Date.now().toString();
					goto(`/transcription/${transcriptionId}`);
				}, 500);
			}
		}, 200);

		return () => clearInterval(interval);
	});

	const handleClose = () => {
		goto('/upload');
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
			<ProgressIndicator {progress} />

			<h1>Transcription in progress...</h1>
			<p class="subtitle">
				Please wait while we transcribe your audio. This may take a few minutes.
			</p>

			<ProgressBar {progress} />
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
	}

	h1 {
		margin: var(--spacing-xl) 0 var(--spacing-md);
		font-size: 28px;
	}

	.subtitle {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
		font-size: 16px;
		line-height: 1.6;
	}
</style>