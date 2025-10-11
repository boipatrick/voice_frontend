import { writable } from 'svelte/store';

export interface Transcription {
	id: string;
	title: string;
	summary: string;
	items: TranscriptionItem[];
	timestamp: string;
}

export interface TranscriptionItem {
	timestamp: string;
	text: string;
}

export const transcriptions = writable<Transcription[]>([]);

export const addTranscription = (transcription: Transcription) => {
	transcriptions.update(items => [transcription, ...items]);
};

export const getTranscription = (id: string): Transcription | undefined => {
	let result: Transcription | undefined;
	transcriptions.subscribe(items => {
		result = items.find(item => item.id === id);
	})();
	return result;
};