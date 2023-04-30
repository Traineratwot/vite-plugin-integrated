import ejs from 'ejs'
import * as fs from 'node:fs'
import * as path from 'node:path'
import jsdom from 'jsdom'

let outDir = ''

function parser(html) {
	const doc = new jsdom.JSDOM(html).window.document
	const scripts = []
	const styles = []
	doc.querySelectorAll('script').forEach(script => scripts.push(script.getAttribute('src')))
	doc.querySelectorAll('link').forEach(
		style => {
			if(style.getAttribute('rel') === 'stylesheet') {
				styles.push(style.getAttribute('href'))
			}
		}
	)

	return {
		scripts,
		styles
	}
}
/**
 * Конструктор для создания книги
 * @param {string} templatePath - path to ejs template
 * @param {string|null} name - path to output file
 */
export const viteIntegratedPlugin = (templatePath, name = null) => ({
	name  : 'vite-integrated-plugin',
	outDir: '',
	configResolved(config) {
		outDir = config.build.outDir
	},
	async transformIndexHtml(html, ctx) {
		const options = parser(html)
		const newHtml = await ejs.renderFile(templatePath, options)
		if(name) {
			const newFileName = path.join(outDir, name)
			console.log(newFileName)
			fs.writeFileSync(newFileName, newHtml)
		}else{
			return newHtml
		}
		return html
	},

})
