// vite.config.ts
import Inspect from 'vite-plugin-inspect'
import { viteIntegratedPlugin } from './plugin/index.js'



export default {
	plugins: [
		Inspect(),
		viteIntegratedPlugin('index.ejs','index.tpl')
	],
}
