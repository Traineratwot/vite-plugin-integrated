import {Plugin} from 'vite';

declare function PluginIntegrated(templatePath: string, name?: string, options?: { [key: string]: any }): Plugin

export {PluginIntegrated as default};
