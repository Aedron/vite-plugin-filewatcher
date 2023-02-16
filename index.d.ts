/// <reference types="node" />
import * as fs from 'fs';
interface Options {
    path: string;
    onChange: (path: string, stats?: fs.Stats) => unknown;
}
export declare function watcher({ path, onChange }: Options): {
    name: string;
    apply: "serve";
    configureServer(): void;
};
export {};
