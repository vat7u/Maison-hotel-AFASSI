// Replaces each {key} in a message with its value. A key missing from `values` becomes an empty
// string. This file imports no message files, so client components can use it without bundling them.
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}
