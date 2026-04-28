export const MAP_CANVAS_COORDINATE_ALIGNMENT_MARKDOWN = [
  `> **한 줄 요약**  
>  
> MQTT·Base64·URL 등으로 받은 맵 이미지를 Fabric 캔버스에 맞출 때 **한 번** 계산한 \`scale\`·\`offsetX\`·\`offsetY\`·원본 크기를 \`canvas.meta\`에 두고, **world → pixel → canvas** 변환을 \`coordinateTransform\` 유틸로만 통과시켜 포인트·경로·로봇·클릭이 **같은 기준**을 쓰도록 맞췄습니다.`,

  `---`,

  `<details>
<summary>World / Pixel / Canvas — 세 좌표가 달리 쓰이는 이유 (클릭하여 펼치기)</summary>
<p><strong>World(맵·월드 프레임)</strong>는 ROS <code>OccupancyGrid</code>·네비가 쓰는 <strong>실제 공간</strong> 단위(일반적으로 미터)입니다. 맵에 붙는 <code>origin</code>(지도 좌하단 등 기준점의 x, y)과 <code>resolution</code>(한 격자당 몇 m인지)으로만 픽셀 격자와 기하학이 연결됩니다. <code>worldToPixel</code>은 보통 <code>(x - originX) / resolution</code> 꼴로 “몇 번째 셀·픽셀 방향”으로 사영합니다.</p>
<p><strong>Pixel(맵 이미지/래스터)</strong>는 <strong>받은 맵 이미지의 네이티브 해상도</strong> 위 좌표입니다. MQTT·파일로 온 <code>width</code>×<code>height</code> PNG 등에서, 포인트에 저장한 <code>pos_x</code>·<code>pos_y</code>·경로 꼭짓점은 <strong>아직 캔버스 DOM에 그대로 씌인 크기는 아닙니다.</strong> 원점은 래스터의 (0,0)을 꼭대기 왼쪽, x는 오른쪽, y는 아래로 흐르는 <strong>이미지 축</strong>을 씁니다(월드 y와 반대로 두는 보정·flip이 코드베이스에 따로 있을 수 있으면 그 단계를 먼저 점검합니다).</p>
<p><strong>Canvas(Fabric 뷰)</strong>는 브라우저에 보이는 <strong>뷰포트 좌상단</strong>이 원점입니다. 맵이 캔버스보다 작거나 크면 <strong>비율을 유지한 축소·확대</strong> 후, 남는 여백이 생기면 <strong>가운데 정렬</strong>이 되고, 이 두 가지를 합쳐 <code>scale</code>·<code>offsetX</code>·<code>offsetY</code>로 요약됩니다. 같은 픽셀 (px, py)이 화면에서 어디이냐는 <code>px * scale + offsetX</code> (y도 동일)이므로, <code>offset</code>을 빼면 “스케일만 맞췄다”는 착시가 납니다.</p>
<table class="w-full min-w-[16rem] border-collapse border border-border text-sm my-2">
<thead class="bg-muted/30">
<tr>
<th class="border border-border px-3 py-2 text-left font-semibold">좌표</th>
<th class="border border-border px-3 py-2 text-left font-semibold">기준</th>
<th class="border border-border px-3 py-2 text-left font-semibold">주로 쓰는 쪽</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-border px-3 py-2 text-muted-foreground">World</td>
<td class="border border-border px-3 py-2 text-muted-foreground">origin, resolution (m/셀)</td>
<td class="border border-border px-3 py-2 text-muted-foreground">로봇 pose, goal, world 단위 API</td>
</tr>
<tr>
<td class="border border-border px-3 py-2 text-muted-foreground">Pixel</td>
<td class="border border-border px-3 py-2 text-muted-foreground">맵 이미지 w×h (래스터)</td>
<td class="border border-border px-3 py-2 text-muted-foreground">저장된 포인트, 그리드 셀 인덱스</td>
</tr>
<tr>
<td class="border border-border px-3 py-2 text-muted-foreground">Canvas</td>
<td class="border border-border px-3 py-2 text-muted-foreground">fit scale + letterbox offset</td>
<td class="border border-border px-3 py-2 text-muted-foreground">Fabric 객체, 클릭/드래그 히트</td>
</tr>
</tbody>
</table>
<p>따라서 <strong>한 흐름</strong>으로 <code>world → pixel(맵) → canvas(뷰)</code>를 고정해 두고, <strong>뒤집는 단계</strong>가 있으면 유틸·주석과 구현이 같이 가야 클릭·그리기·로봇이 한 장면에서 맞습니다.</p>
</details>`,

  `---`,

  `## 1) 왜 틀어지기 쉬운지`,

  `배경은 **원본 픽셀**이고, MQTT·ROS 쪽은 **world**(\`origin\`, \`resolution\`)이고, Fabric 위 오버레이·클릭은 **canvas**입니다. 이미지는 캔버스보다 작거나 크면 **비율 유지 + 중앙 정렬**이 붙으므로, \`pos * scale\`만 하고 **여백 오프셋**을 빼먹으면 점·선·마커가 배경과 어긋납니다.`,

  `기능마다 “대충 비슷한” 식을 따로 쓰면 스케일·오프셋 기준이 조금씩 달라져, **그릴 때**와 **역산할 때**가 엇갈릴 수 있습니다.`,

  `---`,

  `## 2) 고정한 변환 경로`,

  `**world** → \`mapInfo\`의 \`originX/Y\`, \`resolution\`으로 **pixel**(맵 이미지 위) → \`canvas.meta\`의 \`scale\`, \`offsetX\`, \`offsetY\`로 **canvas**. 역방향(\`canvasToPixel\`, \`pixelToWorld\` 등)은 **같은 파일**에서 짝을 맞춰 두어 클릭·드래그·저장에도 동일한 계약을 쓰게 했습니다.`,

  `맵이 MQTT Base64이든 서버 \`image_path\`이든, **캔버스에 붙는 순간** \`applyImageToCanvas\` 쪽에서 meta가 같이 쌓이면 이후 오버레이는 **수신 경로와 무관**하게 동일한 식을 탑니다.`,

  `---`,

  `## 3) 배경에 맞출 때 meta를 쌓는다`,

  `비율 \`Math.min(canvas.width / imgW, …)\`로 스케일을 정하고, 남는 여백을 \`offsetX\`·\`offsetY\`로 잡아 **중앙**에 둡니다. 그 결과를 \`canvas\`에 붙입니다(타입은 예: \`types/mapCanvas.ts\`의 \`CanvasMeta\`).`,

  `<details>
<summary>offsetX / offsetY — letterbox로 생기는 “왼·위” 여백 (클릭하여 펼치기)</summary>
<p>맵 이미지를 캔버스 안에 <strong>비율을 유지한 채</strong> 넣으면(긴 변에 맞춤), 짧은 쪽에는 <strong>빈 띠</strong>가 생깁니다. 뷰는 보통 <strong>가운데</strong>에 맞추기 때문에, 축소된 사각형의 <strong>왼쪽(및 위쪽)에 남는 거리</strong>가 <code>offsetX</code>, <code>offsetY</code>입니다. 예로 가로·세로 둘 다 <code>(canvas.width - imageWidth * scale) / 2</code>처럼 잡습니다. 맵(0,0) 픽셀은 화면 <strong>좌상</strong>이 아니라, <strong>배경 이미지가 그려지기 시작하는</strong> 지점(여백 다음)이므로 캔버스 좌표는 <code>px * scale + offset</code>으로 붙습니다.</p>
</details>`,

  `<details>
<summary>applyImageToCanvas — 맵을 Fabric 배경에 올리는 공통 경로 (클릭하여 펼치기)</summary>
<p>프로젝트마다 파일명은 다를 수 있으나, <strong>역할</strong>은 “MQTT·HTTP로 받은 맵( Base64 <code>data:</code> URL, 일반 URL)을 <strong>같은 루틴</strong>으로 Fabric 캔버스에 배경으로 심는다”에 가깝습니다. <code>setCanvasBackground</code> 쪽에서 소스 형식만 나눈 뒤, 실제 <strong>이미지 로드 → 비율·중앙 정렬 → (canvas as any).meta</strong>까지를 이 경로(또는 이 이름의 함수)에서 한 번에 처리하도록 맞췄습니다. 그래서 <strong>맵이 어디서 왔는지</strong>와 상관없이, 캔버스에 붙은 뒤의 오버레이는 <strong>동일한 meta</strong>만 보면 됩니다.</p>
</details>`,

  `\`\`\`ts
// fabricHelpers.ts (요지)
const scaleX = canvas.width / fabricImg.width;
const scaleY = canvas.height / fabricImg.height;
const scale = Math.min(scaleX, scaleY);
const offsetX = (canvas.width - fabricImg.width * scale) / 2;
const offsetY = (canvas.height - fabricImg.height * scale) / 2;
(canvas as any).meta = {
  scale,
  offsetX,
  offsetY,
  imageWidth: fabricImg.width,
  imageHeight: fabricImg.height,
};
\`\`\``,

  `---`,

  `## 4) world → pixel → canvas 유틸`,

  `\`\`\`ts
// coordinateTransform.ts (요지)
export function worldToPixel(
  worldPos: WorldPosition,
  mapInfo: MapInfo
): PixelPosition {
  return {
    x: (worldPos.x - mapInfo.originX) / mapInfo.resolution,
    y: (worldPos.y - mapInfo.originY) / mapInfo.resolution,
  };
}
export function pixelToCanvas(
  pixelPos: PixelPosition,
  canvasMeta: CanvasMeta
): CanvasPosition {
  return {
    x: pixelPos.x * canvasMeta.scale + canvasMeta.offsetX,
    y: pixelPos.y * canvasMeta.scale + canvasMeta.offsetY,
  };
}
export function worldToCanvas(
  worldPos: WorldPosition,
  mapInfo: MapInfo,
  canvasMeta: CanvasMeta
): CanvasPosition {
  return pixelToCanvas(worldToPixel(worldPos, mapInfo), canvasMeta);
}
\`\`\``,

  `<details>
<summary>canvasToPixel — 뷰 좌표를 맵 픽셀로 되돌리기 (클릭하여 펼치기)</summary>
<p><code>pixelToCanvas</code>의 <strong>역</strong>입니다. Fabric에서 얻은 <code>(canvasX, canvasY)</code>는 여백과 스케일이 섞인 값이므로, 먼저 <code>offsetX</code>·<code>offsetY</code>를 빼서 “맵 래스터 원점(0,0) 기준으로 **몇 px 아래/오른쪽**인가”로 되돌리고, <code>scale</code>로 나누면 <strong>맵 이미지 위의 픽셀</strong> 좌표가 됩니다.</p>
<p><code>canvasX = pixelX * scale + offsetX</code>이므로 <code>pixelX = (canvasX - offsetX) / scale</code>이고, y는 <code>(canvasY - offsetY) / scale</code>입니다. 이 <code>canvasToPixel</code> 결과에 <code>mapInfo</code>를 쓰면 <code>pixelToWorld</code>·<code>canvasToWorld</code>로 이어질 수 있고, <strong>클릭/드래그 저장</strong>과 <strong>그리기</strong>가 <strong>같은 <code>canvas.meta</code></strong>로 맞습니다.</p>
</details>`,

  `로봇 마커는 \`mapInfo\`가 있으면 world를 거치고, 없으면 \`(x, y)\`를 이미 **픽셀**로 보고 \`pixelToCanvas\`만 탑니다.`,

  `\`\`\`ts
// useRobotPositionRenderer.ts (요지)
function toCanvasCoordinates(
  robotPosition: RobotPosition,
  mapInfo: MapInfo | null,
  meta: CanvasMeta
) {
  const pixelPos = mapInfo
    ? worldToPixel({ x: robotPosition.x, y: robotPosition.y }, mapInfo)
    : { x: robotPosition.x, y: robotPosition.y };
  return pixelToCanvas(pixelPos, meta);
}
\`\`\``,

  `---`,

  `## 5) 오버레이·인터랙션은 meta만 본다`,

  `포인트(\`pos_x\`·\`pos_y\`)·경로·미션 선은 \`(canvas as any).meta\`의 \`scale\`·\`offsetX\`·\`offsetY\`로 **같은 식**(\`pixel * scale + offset\`)을 씁니다. 별도 경로(\`usePointsRendering\`, \`missionLine\`, 줌·동기화 훅 등)는 **이미 캔버스에 맞춰진** 전제하에 동작하도록 맞췄습니다.`,

  `ROS \`origin\`·\`resolution\`이 없는 **다른 가정**의 화면 전용 스케일(예: 단일 m/px)은 \`coordinateHelper\` / \`useCoordinateTransform\` 계열로 **이름·역할을 나눠** world 맵과 섞이지 않게 했습니다.`,

  `---`,

  `## 6) 정리`,

  `정합은 “한 군데 캔버스 수학을 잘못 쓴” 문제로만 끝나지 않고, **좌표 모델이 층**으로 쌓일 때 **공통 meta와 단일 변환 체인**이 없으면 쌓입니다. 배경이 들어갈 때 meta를 쌓고, \`worldToPixel\`·\`pixelToCanvas\`·역함수로만 오가게 하면 디버깅은 **\`MapInfo\` / \`canvas.meta\` / 유틸** 셋 중 어디가 어긋났는지**로도 좁혀집니다.`,

  `> 본문 코드 스니펫은 맵·모니터링·편집 캔버스를 다루던 Web 프로젝트의 \`fabricHelpers\`·\`coordinateTransform\`·렌더링 훅 구조를 요약한 것이며, 파일명·\`CanvasMeta\` 정의 위치·실제 수신(MQTT/HTTP)은 저장소 버전에 따릅니다.`,
].join("\n\n");
