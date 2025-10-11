<script lang="ts">
	interface Props {
		progress?: number;
	}

	let { progress = 0 }: Props = $props();
</script>

<div class="progress-indicator">
	<div class="circle outer"></div>
	<div class="circle middle"></div>
	<div class="circle inner">
		<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
			<path d="M19 10v2a7 7 0 0 1-14 0v-2" />
			<line x1="12" y1="19" x2="12" y2="22" />
		</svg>
	</div>
</div>

<style>
	.progress-indicator {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.outer {
		width: 200px;
		height: 200px;
		background: rgba(74, 222, 128, 0.05);
		animation: pulse 2s ease-in-out infinite;
	}

	.middle {
		width: 160px;
		height: 160px;
		background: rgba(74, 222, 128, 0.1);
		animation: pulse 2s ease-in-out infinite 0.3s;
	}

	.inner {
		width: 120px;
		height: 120px;
		background: rgba(74, 222, 128, 0.2);
		color: var(--color-primary);
		animation: pulse 2s ease-in-out infinite 0.6s;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.8;
		}
	}
</style>