<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="welcome-page">
	<div class="content">
		<div class="hero-image">
			<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
				<rect width="400" height="400" fill="#F5E6D3" rx="24"/>
				<rect y="200" width="400" height="200" fill="#F4B4A0"/>
				<path d="M 150 250 Q 200 200 250 250 Q 300 300 350 250 L 350 400 L 150 400 Z" fill="#F4B4A0"/>
				<ellipse cx="200" cy="300" rx="80" ry="120" fill="#2D5F5D"/>
				<path d="M 250 200 Q 300 250 350 200 Q 400 250 450 200 L 450 0 L 250 0 Z" fill="#F4B4A0"/>
			</svg>
		</div>

		<h1>Unlock the Power of Your Voice</h1>
		
		<p class="subtitle">
			Transform your audio into actionable insights with our AI-powered transcription and summarization tool.
		</p>

		<div class="actions">
			<Button variant="primary" fullWidth onclick={() => goto('/upload')}>
				Sign Up
			</Button>
			<Button variant="secondary" fullWidth onclick={() => goto('/upload')}>
				Log In
			</Button>
		</div>

		<p class="legal">
			By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
		</p>
	</div>
</div>

<style>
	.welcome-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		animation: fadeIn 0.6s ease-out;
	}

	.content {
		max-width: 500px;
		width: 100%;
		text-align: center;
	}

	.hero-image {
		width: 280px;
		height: 280px;
		margin: 0 auto var(--spacing-xl);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.hero-image svg {
		width: 100%;
		height: 100%;
	}

	h1 {
		font-size: 36px;
		margin-bottom: var(--spacing-lg);
		line-height: 1.2;
	}

	.subtitle {
		color: var(--color-text-secondary);
		font-size: 18px;
		margin-bottom: var(--spacing-xl);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
	}

	.legal {
		font-size: 14px;
		color: var(--color-text-tertiary);
		line-height: 1.5;
	}

	.legal a {
		color: var(--color-primary);
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 28px;
		}

		.hero-image {
			width: 240px;
			height: 240px;
		}
	}
</style>