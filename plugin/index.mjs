import ejs from "ejs";
import jsdom from "jsdom";
import * as fs from "node:fs";
import * as path from "node:path";


function parser(html) {
	const doc = new jsdom.JSDOM(html).window.document;
	const scripts = [];
	const styles = [];
	doc.querySelectorAll("script").forEach((script) => scripts.push(script.getAttribute("src")));
	doc.querySelectorAll("link").forEach((style) => {
		if (style.getAttribute("rel") === "stylesheet") {
			styles.push(style.getAttribute("href"));
		}
	});

	return {
		scripts,
		styles,
	};
}

let outDir =""
/**
 * Конструктор для создания книги
 * @param {{templatePath: string, outDir:string ,name?: string,	options?: { [key: string]: any }}} myConfig
 */
export const PluginIntegrated = (myConfig) => ({
	name: "vite-integrated-plugin",
	configResolved(config) {
		outDir = config.build.outDir;
	},
	async transformIndexHtml(html, ctx) {
		const options = parser(html);
        outDir = outDir ?? myConfig.outDir
		const newHtml = await ejs.renderFile(myConfig.templatePath, { ...myConfig.options, ...options });
		if (fs.existsSync(outDir)) {
			if (myConfig.name) {
				const newFileName = path.join(outDir, myConfig.name);
				fs.writeFileSync(newFileName, newHtml);
				console.log("[vite-plugin-integrated]: ", "created", newFileName);
				return html;
			} else {
				return newHtml;
			}
		}
	},
});

export default PluginIntegrated;
