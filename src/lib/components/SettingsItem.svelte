<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		value?: string;
		href?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let { label, value, href, onclick, children }: Props = $props();
</script>

{#if href}
	<a {href} class="settings-item">
		<span class="label">{label}</span>
		<div class="right">
			{#if value}
				<span class="value">{value}</span>
			{/if}
			{#if children}
				{@render children()}
			{:else}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			{/if}
		</div>
	</a>
{:else}
	<button class="settings-item" onclick={onclick}>
		<span class="label">{label}</span>
		<div class="right">
			{#if value}
				<span class="value">{value}</span>
			{/if}
			{#if children}
				{@render children()}
			{:else}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			{/if}
		</div>
	</button>
{/if}

<style>
	.settings-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		background: none;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary);
		text-decoration: none;
		font-family: inherit;
		font-size: 16px;
		cursor: pointer;
		transition: background var(--transition-fast);
		width: 100%;
		text-align: left;
	}

	.settings-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.label {
		font-weight: 500;
	}

	.right {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.value {
		color: var(--color-text-secondary);
		font-size: 14px;
	}

	.settings-item svg {
		color: var(--color-text-secondary);
	}
</style>