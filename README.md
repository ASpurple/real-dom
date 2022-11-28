# real-dom
Building DOM and style sheet

# API documentation
### appendStyle(selector: string, styleSheet: CSSSheet)
以添加style标签的方式添加或覆盖样式

### deleteStyle(selector: string, list?: Array<keyof CSSSheet>)
删除 appendStyle 方法添加的样式

### createElementStr(tagName: HTMLElementTag | SVGElementTag, attr: Attribute, style: CSSSheet, child: string): string
创建HTML元素，以字符串的形式返回

### createHTMLElement(tagName: HTMLElementTag, attr: Attribute, style?: CSSSheet): HTMLElement
创建HTML元素，返回DOM

### createSVGElement(tagName: SVGElementTag, attr: Attribute): SVGElement
创建SVG元素，返回DOM

### deleteElement(selector: string, matchAll = true)
删除选择器匹配到的第一个或者全部元素

# Examples
```js
import { createHTMLElement, appendStyle, deleteStyle } from 'real-dom'

appendStyle('.link', { fontSize: '20px', color: 'red' });

const element = createHTMLElement('a', { id: 'a', class: 'link' });
element.innerHTML = 'hello world!'
element.onclick = function() {
  deleteStyle('.link', ['color']);
}
document.body.appendChild(element);
```
