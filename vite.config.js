// vite.config.ts
import Inspect from 'vite-plugin-inspect'
import PluginIntegrated from './plugin/index.js'

export default {
	plugins: [
		Inspect(),
		PluginIntegrated(
			{
				templatePath: 'index.ejs',
				name        : 'index.tpl'
			})
	],
}
