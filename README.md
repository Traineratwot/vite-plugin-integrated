# vite-integrated-plugin

Бывает так что нужно написать небольшой реактивный интерфейс и внедрить его в какой-нибудь старый состоявшийся проэкт
а так как при каждом билде js и css бандлы называются по разному (и это правильно) не возможно просто подключить все и закинуть в верстку `<div id="root">`

Этот плагин поможет решить эту проблему. Он позволит вам сгенерировать помимо `index.html` еще какой-нить файл например `index.tpl` (как в php-smarty) и в него записать все правильнпо подключенные 
скрипты и стили по шаблону описанному в `index.ejs`

ниже приведен пример ejs шаблона и подключение плагина )


## usage
```bash
npm add vite-integrated-plugin
```


```js
function viteIntegratedPlugin(
	templatePath: string// ejs template
	name: string //name output file
){}
```

```js
// vite.config.ts
import { viteIntegratedPlugin } from './plugin/index.js'

export default {
	plugins: [
		viteIntegratedPlugin('index.ejs','index.tpl')
	],
}

```
```ejs
<!--index.ejs-->
<% scripts.forEach(function(script) { %><script type="module" crossorigin src="<%= script %>"></script><% }) %>
<% styles.forEach(function(style) { %><link rel="stylesheet" href="<%= style %>"><% }) %>
<div id="app"></div>
```
