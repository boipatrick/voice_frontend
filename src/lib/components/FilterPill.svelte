<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		active?: boolean;
		onclick?: () => void;
		children: Snippet;
	}

	let { active = false, onclick, children }: Props = $props();
</script>

<button class="filter-pill" class:active onclick={onclick}>
	{@render children()}
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<polyline points="6 9 12 15 18 9" />
	</svg>
</button>

<style>
	.filter-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		border-radius: var(--radius-full);
		border: none;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-base);
		background: var(--color-bg-card);
		color: var(--color-text-secondary);
		font-family: inherit;
	}

	.filter-pill:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.filter-pill.active {
		background: var(--color-primary);
		color: #000;
	}

	.filter-pill svg {
		width: 14px;
		height: 14px;
	}
</style>