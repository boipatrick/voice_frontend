<script lang="ts">
	interface Props {
		title: string;
		timestamp: string;
		href: string;
	}

	let { title, timestamp, href }: Props = $props();
</script>

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

<style>
	.history-item {
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
</style>