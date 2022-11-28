import { type Attribute, type CSSSheet, type HTMLElementTag, type SVGElementTag, toLine } from './common';
export const NS = 'http://www.w3.org/2000/svg';

export function createAttrStr(attr: Attribute): string {
    const arr: string[] = [];
    Object.keys(attr).forEach(k => arr.push(`${toLine(k)}="${attr[k as keyof Attribute]}"`));
    return arr.join(' ');
}

export function createInlineStyleStr(style: CSSSheet): string {
    const arr: string[] = [];
    Object.keys(style).forEach(k => arr.push(`${toLine(k)}:${style[k as keyof CSSSheet]};`));
    return `style="${arr.join(' ')}"`
}

export function createElementStr(tagName: HTMLElementTag | SVGElementTag, attr: Attribute, style: CSSSheet, child: string): string {
    const attrStr = createAttrStr(attr);
    const styleStr = createInlineStyleStr(style);
    return `<${tagName} ${attrStr} ${styleStr}>${child}</${tagName}>`;
}

export function createHTMLElement(tagName: HTMLElementTag, attr: Attribute, style?: CSSSheet): HTMLElement {
    const element = document.createElement(tagName);
    Object.keys(attr).forEach(k => element.setAttribute(toLine(k), attr[k as keyof Attribute] as string));
    if (!style) return element;
    Object.keys(style).forEach(k => element.style.setProperty(toLine(k), style[k as keyof CSSSheet] as string));
    return element;
}

export function createSVGElement(tagName: SVGElementTag, attr: Attribute): SVGElement {
    const element = document.createElementNS(NS, tagName);
    Object.keys(attr).forEach(k => element.setAttribute(toLine(k), attr[k as keyof Attribute] as string));
    return element;
}

export function deleteElement(selector: string, matchAll = true) {
    const elements = document.querySelectorAll(selector);
    if (!matchAll) {
        elements[0] && (elements[0].remove());
        return;
    }
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
}