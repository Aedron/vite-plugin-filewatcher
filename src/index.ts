import * as fs from 'fs';
import * as chokidar from 'chokidar';
import { FSWatcher } from 'chokidar';

interface Options {
	path: string;
	onChange: (path: string, stats?: fs.Stats) => unknown;
}

export function watcher({ path, onChange }: Options) {
	let watcher: FSWatcher | null;

	async function cleanup() {
		if (watcher) {
			await watcher.close();
		}
		watcher = null;
	}

	async function exit() {
		await cleanup();
		console.log('end');
		process.exit(0);
	}

	process.on('exit', exit);
	process.on('SIGINT', exit);
	process.on('SIGUSR1', exit);
	process.on('SIGUSR2', exit);
	process.on('uncaughtException', (e) => {
		console.error(e);
	});

	return {
		name: 'vite-plugin-filewatcher',
		apply: 'serve' as const,
		configureServer() {
			watcher = chokidar.watch(path).on('add', onChange).on('change', onChange).on('unlink', onChange);
		},
	};
}
