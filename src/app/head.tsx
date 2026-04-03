export default function Head() {
  return (
    <>
      <link
        rel="preload"
        href="/lightBgRoundMob.png"
        as="image"
        type="image/png"
        // hero 섹션 배경화면 프리로드, 모바일 라이트 모드 일 때
        media="(max-width: 767px) and (prefers-color-scheme: light)"
      />
      <link
        rel="preload"
        href="/lightBgRound.png"
        as="image"
        type="image/png"
        media="(min-width: 768px) and (prefers-color-scheme: light)"
      />
      <link
        rel="preload"
        href="/darkBgRoundMob.png"
        as="image"
        type="image/png"
        media="(max-width: 767px) and (prefers-color-scheme: dark)"
      />
      <link
        rel="preload"
        href="/darkBgRound.png"
        as="image"
        type="image/png"
        media="(min-width: 768px) and (prefers-color-scheme: dark)"
      />
    </>
  );
}
