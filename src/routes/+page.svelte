<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	
	function handleGoogleAuth() {
		
		goto('/upload');
	}
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
			<Button variant="primary" fullWidth onclick={handleGoogleAuth}>
				<span class="button-content">
					<svg class="google-icon" viewBox="0 0 24 24">
						<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.449-11.666h-9.449z" fill="currentColor"></path>
					</svg>
					Get Started with Google
				</span>
			</Button>
		</div>

		<p class="legal">
			By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
		</p>
	</div>
</div>

<style>
	.welcome-page {
		height: 100vh; 
		overflow-y: auto; 
		display: flex;
		align-items: flex-start; 
		justify-content: center;
		padding: var(--spacing-xl) var(--spacing-lg);
		animation: fadeIn 0.6s ease-out;
	}

	.content {
		max-width: 500px;
		width: 100%;
		text-align: center;
		padding-bottom: var(--spacing-lg); 
		display: flex;
		flex-direction: column;
		justify-content: space-between; 
		min-height: 95vh; 
	}

	.hero-image {
		width: 140px; 
		height: 140px;
		margin: 0 auto var(--spacing-md); 
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.hero-image svg {
		width: 100%;
		height: 100%;
	}

	h1 {
		font-size: 32px;
		margin-bottom: var(--spacing-md); 
		line-height: 1.2;
	}

	.subtitle {
		color: var(--color-text-secondary);
		font-size: 18px;
		margin-bottom: var(--spacing-lg);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md); 
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

	.button-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
	
	.google-icon {
		width: 18px;
		height: 18px;
	}

	@media (max-width: 480px) {
		.hero-image {
			width: 120px; 
			height: 120px;
		}
		
		h1 {
			font-size: 22px;
		}
		
		.subtitle {
			font-size: 14px;
			line-height: 1.4;
		}
		
		.actions {
			gap: var(--spacing-sm);
		}
	}
</style>