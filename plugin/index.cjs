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
            if (style.getAttribute('rel') === 'stylesheet') {
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
 * @param {{templatePath: string,name?: string,	options?: { [key: string]: any }}} config
 */
export const PluginIntegrated = (config) => ({
    name: 'vite-integrated-plugin',
    outDir: '',
    configResolved(config) {
        outDir = config.build.outDir
    },
    async transformIndexHtml(html, ctx) {
        const options = parser(html)

        const newHtml = await ejs.renderFile(config.templatePath, {...config.options, ...options,})
        if (fs.existsSync(outDir)) {
            if (config.name) {
                const newFileName = path.join(outDir, config.name)
                console.log(newFileName)
                fs.writeFileSync(newFileName, newHtml)
                return html
            } else {
                return newHtml
            }
        }
    },

})

export default PluginIntegrated
