function Adapter(_default) {
	var adapter = Object.create(_default);
	adapter.createElement = function () {
		var element = _default.createElement.apply(undefined, arguments);
		element.__proto__ = prototype;
		return element;
	};
	adapter.createDocument = function () {
		var document = _default.createDocument.apply(undefined, arguments);
		document.__proto__ = prototype;
		return document;
	};
	//createTextNode is not exposed thru TreeAdapter, so its callers insertText and insertTextBefore are overridden
	//insertText, insertTextBefore, createTextNode are copied from treeAdapters.default
	adapter.insertText = function (parentNode, text) {
		if (parentNode.childNodes.length) {
			var prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

			if (prevNode.nodeName === '#text') {
				prevNode.value += text;
				return;
			}
		}

		this.appendChild(parentNode, createTextNode(text));
	};
	adapter.insertTextBefore = function (parentNode, text, referenceNode) {
		var prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

		if (prevNode && prevNode.nodeName === '#text')
			prevNode.value += text;
		else
			this.insertBefore(parentNode, createTextNode(text), referenceNode);
	};
	var createTextNode = function (value) {
		return {
			__proto__: prototype,
			nodeName: '#text',
			value: value,
			parentNode: null
		};
	};
	var prototype = Object.create(Object.prototype, {
		type: { get: function () { return this.tagName ? 'tag' : 'text'; } },
		name: { get: function () { return this.tagName; } },
		child: { get: function () { return this.childNodes; } },
		attribute: { get: function () { return this.attrs; } }
	});
	return adapter;
}
