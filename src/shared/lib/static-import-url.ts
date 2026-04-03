/** next/webpack 정적 import가 `string` 또는 `{ src: string }`일 때 URL 문자열로 통일 */
export function staticImportUrl(
  asset: string | { src: string },
): string {
  return typeof asset === "string" ? asset : asset.src;
}

/**
 * `ImageWithFallback`에 `key={imageWithFallbackKey(src)}`로 사용.
 * src가 바뀌면 인스턴스가 리마운트되어 에러 등 로컬 state가 초기화됩니다.
 */
export function imageWithFallbackKey(
  asset: string | { src: string },
): string {
  return staticImportUrl(asset);
}
