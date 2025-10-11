<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		fullWidth?: boolean;
		onclick?: () => void;
		children: Snippet;
		type?: 'button' | 'submit';
	}

	let { variant = 'primary', fullWidth = false, onclick, children, type = 'button' }: Props = $props();
</script>

<button
	{type}
	class="btn btn-{variant}"
	class:full-width={fullWidth}
	onclick={onclick}
>
	{@render children()}
</button>

<style>
	.btn {
		padding: 16px 32px;
		border: none;
		border-radius: var(--radius-full);
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-base);
		font-family: inherit;
		min-height: 56px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.btn-primary {
		background: var(--color-primary);
		color: #000;
	}

	.btn-primary:hover {
		background: #3BC970;
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(74, 222, 128, 0.3);
	}

	.btn-primary:active {
		transform: translateY(0);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.full-width {
		width: 100%;
	}
</style>