# vite-integrated-plugin

### En
It happens that you need to write a small reactive interface and implement it into some old project, 
and since with each build js and css bundles are called differently (and this is correct), it is not possible to simply connect everything and throw it into the layout `<div id="root">`

This plugin will help solve this problem. It will allow you to generate in addition `index.html` another thread file, for example `index.tpl` (as in php-smarty) and write all the correctly connected scripts and styles into it according to the template described in index.ejs

below is an example of a js template and plug-in connection.

Also, in `options`, you can throw any data and use it in `ejs`

### Ru
Бывает так что нужно написать небольшой реактивный интерфейс и внедрить его в какой-нибудь старый состоявшийся проэкт
а так как при каждом билде js и css бандлы называются по разному (и это правильно) не возможно просто подключить все и закинуть в верстку `<div id="root">`

Этот плагин поможет решить эту проблему. Он позволит вам сгенерировать помимо `index.html` еще какой-нить файл например `index.tpl` (как в php-smarty) и в него записать все правильнпо подключенные 
скрипты и стили по шаблону описанному в `index.ejs`

ниже приведен пример ejs шаблона и подключение плагина.

Также в `options` можно прокинуть любые данные и использовать в `ejs`

### usage
```bash
npm i vite-plugin-integrated
```


```js
function viteIntegratedPlugin(
	{
	  templatePath: string,// ejs template
	  name        : string, //name output file
	  options:{}
  }
){}
```

```js
// vite.config.ts
import { viteIntegratedPlugin } from './plugin/index.js'

export default {
	plugins: [
		viteIntegratedPlugin({
								 templatePath: 'index.ejs',
								 name        : 'index.tpl'
		}
		)
	],
}

```
```ejs
<!--index.ejs-->
<% scripts.forEach(function(script) { %><script type="module" crossorigin src="<%= script %>"></script><% }) %>
<% styles.forEach(function(style) { %><link rel="stylesheet" href="<%= style %>"><% }) %>
<div id="app"></div>
```
