<script lang="ts">
	interface Props {
		progress: number;
	}

	let { progress }: Props = $props();
</script>

<div class="progress-container">
	<p class="progress-text">{progress}% complete</p>
	<div class="progress-bar">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>
</div>

<style>
	.progress-container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}

	.progress-text {
		color: var(--color-text-secondary);
		font-size: 14px;
		margin-bottom: var(--spacing-sm);
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background: var(--color-progress-bg);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-full);
		transition: width 0.3s ease;
	}
</style>