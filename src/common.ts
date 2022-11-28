export type CSSSheet = Partial<CSSStyleDeclaration>;

export type HTMLElementTag = keyof HTMLElementTagNameMap;

export type SVGElementTag = keyof SVGElementTagNameMap;

export type Attribute = Record<string, string> | CSSSheet;

export function toLine(name: string): string {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}
