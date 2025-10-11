<script lang="ts">
	import { goto } from '$app/navigation';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import SettingsItem from '$lib/components/SettingsItem.svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	let darkMode = $state(true);

	const goBack = () => {
		goto('/history');
	};

	const handleDarkModeChange = (checked: boolean) => {
		darkMode = checked;
		// In a real app, you'd persist this to localStorage
		localStorage.setItem('darkMode', checked.toString());
	};
</script>

<div class="settings-page">
	<header class="header">
		<button class="back-btn" onclick={goBack} aria-label="Go back">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</button>
		<h2>Settings</h2>
		<div class="spacer"></div>
	</header>

	<main class="main-content">
		<div class="profile-section">
			<img
				src="https://i.pravatar.cc/150?img=5"
				alt="Profile"
				class="avatar"
			/>
			<div class="profile-info">
				<h3>Sophia Carter</h3>
				<p>sophia.carter@email.com</p>
			</div>
		</div>

		<section class="settings-section">
			<h4 class="section-title">Account</h4>
			<div class="settings-group">
				<SettingsItem label="Update Profile" href="/settings/profile" />
				<SettingsItem label="Change Password" href="/settings/password" />
			</div>
		</section>

		<section class="settings-section">
			<h4 class="section-title">Preferences</h4>
			<div class="settings-group">
				<SettingsItem label="Notifications" href="/settings/notifications" />
				<SettingsItem label="Language" value="English" href="/settings/language" />
				<SettingsItem label="Connected Accounts" href="/settings/accounts" />
			</div>
		</section>

		<section class="settings-section">
			<h4 class="section-title">App Settings</h4>
			<div class="settings-group">
				<SettingsItem label="Dark Mode">
					<Toggle bind:checked={darkMode} onchange={handleDarkModeChange} />
				</SettingsItem>
				<SettingsItem label="Clear Cache" onclick={() => alert('Cache cleared!')} />
				<SettingsItem label="About" href="/settings/about" />
			</div>
		</section>
	</main>

	<BottomNav activeTab="settings" />
</div>

<style>
	.settings-page {
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
		padding-bottom: var(--spacing-xl);
	}

	.profile-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-xl) var(--spacing-lg);
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.profile-info h3 {
		font-size: 24px;
		font-weight: 600;
		margin: 0 0 4px 0;
	}

	.profile-info p {
		font-size: 14px;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.settings-section {
		margin-bottom: var(--spacing-xl);
	}

	.section-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		padding: 0 var(--spacing-lg);
		margin-bottom: var(--spacing-sm);
	}

	.settings-group {
		background: rgba(255, 255, 255, 0.02);
	}
</style>