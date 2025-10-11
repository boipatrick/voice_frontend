<script lang="ts">
	interface Props {
		checked: boolean;
		onchange?: (checked: boolean) => void;
	}

	let { checked = $bindable(), onchange }: Props = $props();

	const handleChange = () => {
		checked = !checked;
		onchange?.(checked);
	};
</script>

<button
	class="toggle"
	class:checked
	onclick={handleChange}
	role="switch"
	aria-checked={checked}
>
	<span class="toggle-thumb"></span>
</button>

<style>
	.toggle {
		position: relative;
		width: 56px;
		height: 32px;
		border-radius: var(--radius-full);
		border: none;
		cursor: pointer;
		transition: background var(--transition-base);
		background: var(--color-bg-input);
		padding: 0;
	}

	.toggle.checked {
		background: var(--color-primary);
	}

	.toggle-thumb {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		transition: transform var(--transition-base);
	}

	.toggle.checked .toggle-thumb {
		transform: translateX(24px);
	}
</style>