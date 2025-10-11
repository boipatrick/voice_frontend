<script lang="ts">
	import BottomNav from '$lib/components/BottomNav.svelte';
	import DropZone from '$lib/components/DropZone.svelte';
	import { goto } from '$app/navigation';

	const handleFileSelect = (file: File) => {
		console.log('File selected:', file.name);
		// Store file info and navigate to transcribing page
		localStorage.setItem('currentFile', JSON.stringify({
			name: file.name,
			size: file.size,
			type: file.type
		}));
		goto('/transcribing');
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

			<DropZone onFileSelect={handleFileSelect} />
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
</style>