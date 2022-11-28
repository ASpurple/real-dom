import { CSSSheet, toLine } from "./common";

const StyleStore = new Map<string, { element: HTMLElement; sheet: CSSSheet }>();

function sheetToString(selector: string, styleSheet: CSSSheet): string {
  const pre = selector + "{";
  const sub = "}";
  let style = "";
  Object.keys(styleSheet).forEach((k) => {
    const value = styleSheet[k as keyof CSSSheet];
    style += toLine(k) + ":" + value + ";";
  });
  return pre + style + sub;
}

export function appendStyle(selector: string, styleSheet: CSSSheet) {
  const existStyle = StyleStore.get(selector);
  if (existStyle) {
    styleSheet = Object.assign(existStyle.sheet, styleSheet);
    existStyle.element.innerHTML = sheetToString(selector, styleSheet);
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.innerHTML = sheetToString(selector, styleSheet);
  document.head.appendChild(styleElement);
  StyleStore.set(selector, { element: styleElement, sheet: styleSheet });
}

export function deleteStyle(selector: string, list?: Array<keyof CSSSheet>) {
  const style = StyleStore.get(selector);
  if (!style) return;
  if (!list) {
    style.element.remove();
    StyleStore.delete(selector);
    return;
  }
  const newSheet = { ...style.sheet };
  list.forEach((k) => delete newSheet[k]);
  style.sheet = newSheet;
  style.element.innerHTML = sheetToString(selector, newSheet);
}
