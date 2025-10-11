<script lang="ts">
	import Button from './Button.svelte';

	interface Props {
		onFileSelect: (file: File) => void;
	}

	let { onFileSelect }: Props = $props();

	let isDragging = $state(false);
	let fileInput: HTMLInputElement;

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		isDragging = true;
	};

	const handleDragLeave = () => {
		isDragging = false;
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
		
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('audio/')) {
				onFileSelect(file);
			} else {
				alert('Please upload an audio file');
			}
		}
	};

	const handleFileInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			onFileSelect(files[0]);
		}
	};

	const openFileDialog = () => {
		fileInput.click();
	};
</script>

<div
	class="drop-zone"
	class:dragging={isDragging}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	role="button"
	tabindex="0"
	onclick={openFileDialog}
	onkeydown={(e) => e.key === 'Enter' && openFileDialog()}
>
	<div class="icon-wrapper">
		<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
			<polyline points="16 8 12 4 8 8" />
			<line x1="12" y1="4" x2="12" y2="16" />
		</svg>
	</div>

	<p class="drop-text">Drag and drop your audio file here</p>
	
	<span class="divider">or</span>
	
	<Button variant="primary" onclick={openFileDialog}>
		Select from device
	</Button>

	<input
		bind:this={fileInput}
		type="file"
		accept="audio/*"
		onchange={handleFileInput}
		style="display: none;"
	/>
</div>

<style>
	.drop-zone {
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		text-align: center;
		cursor: pointer;
		transition: all var(--transition-base);
		background: rgba(255, 255, 255, 0.02);
		min-height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-lg);
	}

	.drop-zone:hover,
	.drop-zone.dragging {
		border-color: var(--color-primary);
		background: rgba(74, 222, 128, 0.05);
	}

	.icon-wrapper {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: rgba(74, 222, 128, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
		margin-bottom: var(--spacing-md);
	}

	.drop-zone.dragging .icon-wrapper {
		background: rgba(74, 222, 128, 0.2);
		transform: scale(1.1);
	}

	.drop-text {
		font-size: 20px;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.divider {
		color: var(--color-text-secondary);
		font-size: 16px;
	}

	@media (max-width: 480px) {
		.drop-zone {
			min-height: 350px;
			padding: var(--spacing-lg);
		}

		.icon-wrapper {
			width: 100px;
			height: 100px;
		}

		.icon-wrapper svg {
			width: 48px;
			height: 48px;
		}

		.drop-text {
			font-size: 18px;
		}
	}
</style>