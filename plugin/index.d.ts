import { Plugin } from 'vite';

export type PluginIntegratedOptions = {
	templatePath: string
	name?: string
	outDir?: string
	options?: { [key: string]: any }
}

declare function PluginIntegrated(options: PluginIntegratedOptions,): Plugin

export { PluginIntegrated as default };

