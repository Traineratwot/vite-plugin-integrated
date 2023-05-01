(function() {
	function add(type, value) {
		if(type === 'script') {
			window.document.write(`<script type="module" crossorigin src=${value}"></script>`)
		}
		if(type === 'style') {
			window.document.write(`<link rel="stylesheet" href=${value}">`)
		}
	}

})()
