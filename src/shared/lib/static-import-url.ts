/** next/webpack 정적 import가 `string` 또는 `{ src: string }`일 때 URL 문자열로 통일 */
export function staticImportUrl(
  asset: string | { src: string },
): string {
  return typeof asset === "string" ? asset : asset.src;
}
