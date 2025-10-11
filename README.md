# Voice Transcription App

A sleek, modern voice transcription application built with SvelteKit 5. Transform your audio into actionable insights with AI-powered transcription and summarization.

## Features

- 🎤 **Audio Upload**: Drag-and-drop or select audio files from your device
- 📝 **Real-time Transcription**: Watch your audio being transcribed with progress tracking
- 📊 **AI Summaries**: Get concise summaries of your transcriptions
- 📚 **History Management**: Search and filter through your past transcriptions
- ⚙️ **Customizable Settings**: Dark mode, notifications, and more
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Framework**: SvelteKit 5
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Inline SVG icons
- **State Management**: Svelte stores

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable UI components
│   ├── stores/          # Svelte stores for state management
│   └── assets/          # Static assets
├── routes/              # SvelteKit routes
│   ├── +page.svelte           # Welcome page
│   ├── upload/                # Upload page
│   ├── transcribing/          # Progress page
│   ├── transcription/[id]/    # Transcription details
│   ├── history/               # History page
│   └── settings/              # Settings page
└── app.css              # Global styles
```

## Pages

1. **Welcome Page** (`/`): Onboarding with sign up/login
2. **Upload Page** (`/upload`): Drag-and-drop audio file upload
3. **Transcribing Page** (`/transcribing`): Real-time progress tracking
4. **Transcription Page** (`/transcription/:id`): View summary and full transcription
5. **History Page** (`/history`): Browse and search past transcriptions
6. **Settings Page** (`/settings`): Manage account and preferences

## Design System

### Colors
- Primary Green: `#4ADE80`
- Dark Background: `#1A2E2A` → `#0F1F1C`
- Card Background: `#2C3E50`
- Text Primary: `#FFFFFF`
- Text Secondary: `#9CA3AF`

### Typography
- Font Family: Inter
- Headings: 700 weight
- Body: 400 weight