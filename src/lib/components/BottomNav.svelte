<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		activeTab?: 'upload' | 'history' | 'settings';
	}

	let { activeTab = 'upload' }: Props = $props();

	const isActive = (tab: string) => {
		if (activeTab) return activeTab === tab;
		const path = $page.url.pathname;
		if (tab === 'upload') return path === '/' || path === '/upload';
		if (tab === 'history') return path.includes('/history') || path.includes('/transcribing');
		if (tab === 'settings') return path.includes('/settings');
		return false;
	};
</script>

<nav class="bottom-nav">
	<a href="/upload" class="nav-item" class:active={isActive('upload')}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>
		<span>Upload</span>
	</a>
	
	<a href="/history" class="nav-item" class:active={isActive('history')}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<path d="M3 3v5h5" />
			<path d="M12 7v5l4 2" />
		</svg>
		<span>History</span>
	</a>
	
	<a href="/settings" class="nav-item" class:active={isActive('settings')}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="3" />
			<path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H5m13.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
		</svg>
		<span>Settings</span>
	</a>
</nav>

<style>
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(15, 31, 28, 0.95);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-around;
		padding: 12px 0;
		z-index: 100;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		color: var(--color-text-secondary);
		text-decoration: none;
		padding: 8px 24px;
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		min-width: 80px;
	}

	.nav-item span {
		font-size: 14px;
		font-weight: 500;
	}

	.nav-item.active {
		color: var(--color-primary);
		background: rgba(74, 222, 128, 0.1);
	}

	.nav-item:hover:not(.active) {
		color: var(--color-text-primary);
		background: rgba(255, 255, 255, 0.05);
	}
</style>