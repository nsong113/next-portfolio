export const MAP_CANVAS_COORDINATE_ALIGNMENT_MARKDOWN = [
  `> **한 줄 요약**  
>  
> MQTT·Base64·URL 등으로 받은 맵 이미지를 Fabric 캔버스에 맞출 때 **한 번** 계산한 \`scale\`·\`offsetX\`·\`offsetY\`·원본 크기를 \`canvas.meta\`에 두고, **world → pixel → canvas** 변환을 \`coordinateTransform\` 유틸로만 통과시켜 포인트·경로·로봇·클릭이 **같은 기준**을 쓰도록 맞췄습니다.`,
  `<details>
<summary> scale · offsetX · offsetY · 원본 크기 (클릭하여 펼치기)</summary>
<p><strong>scale은</strong> 지도 이미지가 캔버스에 맞게 얼마나 확대 또는 축소됐는지입니다.</p>
<p><strong>offsetX는</strong> 이미지가 가운데 정렬되면서 왼쪽에 생긴 여백입니다.</p>
<p><strong>offsetY는</strong> 위쪽에 생긴 여백입니다.</p>
<p><strong>원본 크기는</strong> 지도 이미지 자체의 width, height입니다.</p>

<p>예를 들어 원본 지도 이미지가 1000px × 1000px인데, 캔버스가 500px × 400px이면 이미지를 그대로 넣을 수 없습니다. 비율을 유지하려면 0.4배로 줄이고, 좌우에는 여백이 생길 수 있습니다. 이때 단순히 좌표 * 0.4만 하면 안 되고, 여백까지 더해야 정확한 위치가 됩니다. 그래서 한 번 계산한 값을 canvas.meta에 저장해 둔 것입니다. 이렇게 해두면 포인트를 그릴 때도, 로봇을 그릴 때도, 경로를 그릴 때도, 사용자가 지도 위를 클릭할 때도 전부 같은 기준을 사용할 수 있습니다.</p>
</details>`,

  `<details>
<summary>World · Pixel · Canvas — 세 좌표가 달리 쓰이는 이유 (클릭하여 펼치기)</summary>
<p><strong>World(맵·월드 프레임)</strong>는 ROS <code>OccupancyGrid</code>·네비가 쓰는 <strong>실제 공간</strong> 단위(일반적으로 미터)입니다. 맵에 붙는 <code>origin</code>(지도 좌하단 등 기준점의 x, y)과 <code>resolution</code>(한 격자당 몇 m인지)으로만 픽셀 격자와 기하학이 연결됩니다.</p>

<p>로봇이 쓰는 실제 공간 좌표를 지도 이미지 위의 픽셀 좌표로 바꾸려면 origin과 resolution이 필요합니다.</p>

<p><strong>origin</strong> "이 지도에서 world 좌표의 시작 기준점이 어디냐?"입니다. </p>
<p><strong>resolution</strong> “지도 이미지의 픽셀 한 칸이 실제 몇 미터냐”입니다.</p>

<p>그래서 공식이 이렇게 됩니다.</p>
<code>pixelX = (worldX - originX) / resolution</code>
<br />
<code>pixelY = (worldY - originY) / resolution</code>

<br /><br />

<p><strong>Pixel(맵 이미지/래스터)</strong>는 <strong>받은 맵 이미지의 네이티브 해상도</strong> 위 좌표입니다. MQTT·파일로 온 <code>width</code>×<code>height</code> PNG 등에서, 포인트에 저장한 <code>pos_x</code>·<code>pos_y</code>·경로 꼭짓점은 <strong>아직 캔버스 DOM에 그대로 씌인 크기는 아닙니다.</strong> 원점은 래스터의 (0,0)을 꼭대기 왼쪽, x는 오른쪽, y는 아래로 흐르는 <strong>이미지 축</strong>을 씁니다.</p>

<p>즉 이미지 안에서 어떤 점이 pos_x: 300, pos_y: 200이면, 이것은 “브라우저 화면에서 300px, 200px 위치”라는 뜻이 아닙니다.

정확히는 “원본 지도 이미지에서 왼쪽으로부터 300px, 위쪽으로부터 200px 떨어진 지점”이라는 뜻입니다.

예를 들어 원본 이미지가 1000×800인데, 화면의 Fabric 캔버스에는 500×400 크기로 줄여서 보여줄 수 있습니다. 이때 원본 이미지의 (300, 200) 지점은 캔버스에서는 그대로 (300, 200)이 아닙니다.

이미지가 절반으로 줄었다면 캔버스에서는 대략 (150, 100) 근처가 됩니다. 여기에 중앙 정렬 여백이 있으면 offsetX, offsetY까지 더해야 합니다.</p>

<br />


<p><strong>Canvas(Fabric 뷰)</strong>는 브라우저에 보이는 <strong>뷰포트 좌상단</strong>이 원점입니다. 맵이 캔버스보다 작거나 크면 <strong>비율을 유지한 축소·확대</strong> 후, 남는 여백이 생기면 <strong>가운데 정렬</strong>이 되고, 이 두 가지를 합쳐 <code>scale</code>·<code>offsetX</code>·<code>offsetY</code>로 요약됩니다. 같은 픽셀 (px, py)이 화면에서 어디이냐는 <code>px * scale + offsetX</code> (y도 동일)이므로, <code>offset</code>을 빼면 “스케일만 맞췄다”는 착시가 납니다.</p>

<p>원본 지도 이미지의 픽셀 좌표를 브라우저 캔버스 위에 그릴 때는, 이미지가 줄어든 비율뿐 아니라 가운데 정렬 때문에 생긴 여백도 같이 계산해야 합니다.</p>

<p>예를 들어 캔버스 크기가 이렇다고 해보겠습니다.</p>
<code>canvasWidth = 800</code>
<code>canvasHeight = 600</code>

<p>그리고 원본 지도 이미지가 이렇다고 해보겠습니다.</p>
<code>imageWidth = 1000</code>
<code>imageHeight = 1000</code>

<p>원본 지도는 정사각형인데, 캔버스는 가로가 더 넓습니다. 이 이미지를 캔버스 안에 비율을 유지해서 넣으려면, 1000×1000 이미지를 600×600으로 줄여야 합니다. 그래야 세로 600 안에 딱 들어갑니다. (스케일 0.6)</p>
<p>그런데 600×600으로 줄인 이미지를 800×600 캔버스에 넣으면 가로가 200px 남습니다. 가운데 정렬하면 왼쪽에 100px, 오른쪽에 100px 여백이 생깁니다.</p>
<p>즉 지도 이미지는 캔버스의 맨 왼쪽 (0, 0)부터 시작하는 게 아니라, (100, 0)부터 시작합니다.</p>

<p>이제 원본 지도 이미지 안에 어떤 포인트가 있다고 해보겠습니다.</p>
<code>pixelX = 300</code>
<code>pixelY = 200</code>

<p>캔버스에 그릴 때 축소 비율만 적용하면 안됩니다. 지도 이미지가 캔버스 왼쪽에서 100px 떨어진 지점부터 시작했기 때문입니다. 그래서 offsetX를 더해야 합니다.</p>
       <pre> <code>
canvasX = pixelX * scale + offsetX
        = 300 * 0.6 + 100
        = 280
canvasY = pixelY * scale + offsetY
        = 200 * 0.6 + 0
        = 120
        </code></pre>

<br /><br />

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

  `<details>
<summary>ROS (클릭하여 펼치기)</summary>
<p>ROS는 Robot Operating System의 줄임말입니다. 이름에는 Operating System이 들어가지만, Windows나 macOS 같은 일반적인 운영체제라기보다는 로봇 소프트웨어를 만들기 위한 프레임워크/미들웨어에 가깝습니다.

쉽게 말하면 ROS는 로봇 안에서 여러 기능이 서로 데이터를 주고받게 해주는 구조입니다.

예를 들어 로봇에는 이런 기능들이 따로 있을 수 있습니다.</p>
<ul>
<li>카메라 인식</li>
<li>라이다 센서 처리</li>
<li>현재 위치 추정</li>
<li>지도 생성</li>
</ul>

<p>이 기능들이 각각 독립적으로 실행되면서 서로 메시지를 주고받습니다.
예를 들면:</p>

<ul>
<li>라이다 센서 → 주변 장애물 데이터 발행</li>
<li>위치 추정 노드 → 로봇의 현재 위치 발행</li>
<li>경로 계획 노드 → 목적지까지의 이동 경로 계산</li>
<li>제어 노드 → 모터에 이동 명령 전달</li>
<li>프론트엔드 → 지도, 로봇 위치, 경로를 화면에 표시</li>
</ul>

<p>여기서 프론트엔드는 ROS에서 직접 데이터를 받기보다는, 백엔드나 MQTT 같은 중간 경로를 통해 데이터를 받을 수 있습니다. 사용자가 다루던 맵 프로젝트에서는 ROS 쪽에서 나온 지도, 로봇 위치, 경로 정보가 웹 화면에 표시되는 구조였다고 보면 됩니다.

ROS에서 자주 나오는 개념은 이런 것들입니다.

OccupancyGrid는 로봇이 보는 지도 데이터입니다. 각 칸이 비어 있는지, 막혀 있는지, 모르는 영역인지 나타내는 격자형 맵입니다.

origin은 지도 좌표계의 기준점입니다.

resolution은 지도 한 칸이 실제 공간에서 몇 미터인지 나타내는 값입니다. 예를 들어 0.05면 한 칸이 5cm입니다.

pose는 로봇의 위치와 방향입니다. 예를 들어 x, y, theta 같은 값으로 표현합니다.

정리하면, ROS는 로봇의 센서, 지도, 위치, 이동 명령 같은 데이터를 구조적으로 주고받게 해주는 로봇 개발용 시스템입니다.</p>


</details>`,

  `---`,

  `## 1) 왜 틀어지기 쉬운지`,

  `배경은 **원본 픽셀**이고, MQTT·ROS 쪽은 **world**(\`origin\`, \`resolution\`)이고, Fabric 위 오버레이·클릭은 **canvas**입니다. 이미지는 캔버스보다 작거나 크면 **비율 유지 + 중앙 정렬**이 붙으므로, \`pos * scale\`만 하고 **여백 오프셋**을 빼먹으면 점·선·마커가 배경과 어긋납니다.`,

  `기능마다 “대충 비슷한” 식을 따로 쓰면 스케일·오프셋 기준이 조금씩 달라져, **그릴 때**와 **역산할 때**가 엇갈릴 수 있습니다.`,

  `---`,

  `## 2) 고정한 변환 경로`,

  `\`world\` → mapInfo의 originX/Y, resolution으로 \`pixel\` (맵 이미지 위) → canvas.meta의 scale, offsetX, offsetY로 \`canvas\`. 역방향(canvasToPixel, pixelToWorld 등)은 **같은 파일**에서 짝을 맞춰 두어 클릭·드래그·저장에도 동일한 계약을 쓰게 했습니다.`,

  `맵이 MQTT Base64이든 서버 \`image_path\`이든, **캔버스에 붙는 순간** \`applyImageToCanvas\` 쪽에서 meta가 같이 쌓이면 이후 오버레이는 **수신 경로와 무관**하게 동일한 식을 탑니다.`,

  `<details>
<summary>applyImageToCanvas — 맵을 Fabric 배경에 올리는 공통 경로 (클릭하여 펼치기)</summary>
<p><strong>역할</strong>은 “MQTT·HTTP로 받은 맵( Base64 <code>data:</code> URL, 일반 URL)을 <strong>같은 루틴</strong>으로 Fabric 캔버스에 배경으로 심는다”에 가깝습니다. <code>setCanvasBackground</code> 쪽에서 소스 형식만 나눈 뒤, 실제 <strong>이미지 로드 → 비율·중앙 정렬 → (canvas as any).meta</strong>까지를 이 경로(또는 이 이름의 함수)에서 한 번에 처리하도록 맞췄습니다. 그래서 <strong>맵이 어디서 왔는지</strong>와 상관없이, 캔버스에 붙은 뒤의 오버레이는 <strong>동일한 meta</strong>만 보면 됩니다.</p>
</details>`,

  `---`,

  `## 3) 배경에 맞출 때 meta를 쌓는다`,

  `비율 \`Math.min(canvas.width / imgW, …)\`로 스케일을 정하고, 남는 여백을 \`offsetX\`·\`offsetY\`로 잡아 **중앙**에 둡니다. 그 결과를 \`canvas\`에 붙입니다.`,

  `<details>
<summary>offsetX / offsetY — letterbox로 생기는 “왼·위” 여백 (클릭하여 펼치기)</summary>
<p>맵 이미지를 캔버스 안에 <strong>비율을 유지한 채</strong> 넣으면(긴 변에 맞춤), 짧은 쪽에는 <strong>빈 띠</strong>가 생깁니다. 뷰는 보통 <strong>가운데</strong>에 맞추기 때문에, 축소된 사각형의 <strong>왼쪽(및 위쪽)에 남는 거리</strong>가 <code>offsetX</code>, <code>offsetY</code>입니다. 예로 가로·세로 둘 다 <code>(canvas.width - imageWidth * scale) / 2</code>처럼 잡습니다. 맵(0,0) 픽셀은 화면 <strong>좌상</strong>이 아니라, <strong>배경 이미지가 그려지기 시작하는</strong> 지점(여백 다음)이므로 캔버스 좌표는 <code>px * scale + offset</code>으로 붙습니다.</p>
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
].join("\n\n");
