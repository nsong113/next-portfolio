// export const MAP_EDIT_FABRIC_ZOOM_STABILITY_MARKDOWN = [
//   `> **한 줄 요약**
// >
// > 맵 **편집**은 \`pos_x\`·\`pos_y\`(**맵 이미지 좌표**)을 저장의 기준으로 두고, 그리기·입력은 \`canvas.meta\`와 **scene**·\`getScenePoint\`로만 오갔습니다. **줌**은 선택 포인트가 있을 때 **뷰포트**를 다시 잡아, 확대·축소 뒤에도 **화면에서 보던 점**이 밀리지 않게 맞췄습니다. 줌·팬·포인트·경로·클릭 이동은 **훅**으로 쪼개어 같은 수식을 공유했습니다.`,

//   `---`,

//   `## 1) 겹쳐 있던 기준`,

//   `스토어의 \`pos_x\`·\`pos_y\`는 **원본 래스터** 기준이고, 맵이 캔버스에 **맞춰지며** 붙는 \`scale\`·\`offsetX\`·\`offsetY\`(\`canvas.meta\`)를 거쳐야 **Fabric**에서의 \`left\`·\`top\`에 가깝게 둡니다. 여기에 **viewportTransform**(줌·팬)이 곱해지면 사용자가 **보는** 위치는 또 달라집니다.`,

//   `이 세 층을 **기능마다** 따로 풀면, 줌·팬 **이후**에는 같은 \`pos_x\`·\`pos_y\`라도 “화면에서의 위치”가 기대와 **살짝** 어긋날 수 있었습니다. 특히 **하나의 포인트**를 잡고 확대해 편집할 때, 줌만 바꿨는데 점이 **눈앞에서 밀리면** 흐름이 끊깁니다.`,

//   `또 **팬**과 **경로(펜) 드래그**는 같은 마우스 제스처를 **다르게** 읽을 수 있어, 모드에 따라 **한쪽을 끄는** 식의 정리가 필요했습니다.`,

//   `---`,

//   `## 2) 잡은 원칙`,

//   `**저장**은 항상 맵 이미지 좌표로 두고, **줌·팬**은 “보는 방법”만 바꿉니다. **그리기**는 \`pos * scale + offset\`으로 **scene**에 올리고, **클릭·드래그·경로**는 \`getScenePoint\`로 **scene**을 얻은 뒤 \`(x - offset) / scale\`로 **이미지**로 돌려 저장합니다. **줌 슬라이더**가 움직이면, **선택된 포인트**가 있을 때는 그 점이 **이전과 같은 화면 좌표**에 남도록 \`setViewportTransform\`의 이동 항(\`vpt[4]\`, \`vpt[5]\`)을 맞췄고, **선택이 없을 때**는 캔버스 **중앙**을 기준으로 \`zoomToPoint\`에 가깝게 두었습니다.`,

//   `인터랙션은 \`useCanvasZoom\`·\`useCanvasPan\`·\`usePointsRendering\`·\`usePointDragEvents\`·\`usePointSync\`·\`usePointClickMove\`·\`usePathDrawing\` 등으로 **책임만** 나누고, **같은 \`meta\`**를 공유하게 했습니다.`,

//   `---`,

//   `## 3) 코드에 가깝게`,

//   `### 3-1. \`canvas.meta\` — 배경이 생길 때 정해지는 눈금`,

//   `\`applyImageToCanvas\` 등에서 \`(canvas as any).meta\`에 \`scale\`, \`offsetX\`, \`offsetY\`, \`imageWidth\`, \`imageHeight\`를 두고, 이후 **모든** 맵 좌표 식이 여기서 출발합니다. (맵 정합 글과 같은 계약입니다.)`,

//   `### 3-2. 훅으로 나눈 조합`,

//   `\`InteractiveMapCanvasView\`에서 \`useCanvasZoom\`·\`useCanvasPan\`·\`usePointsRendering\`·\`usePointDragEvents\`·\`usePointSync\`·\`usePathDrawing\`·\`usePointClickMove\` 등이 **같은 캔버스**에 올라갑니다. \`useCanvasPan\`은 \`add_point\`이면서 **path 모드**일 때 \`isDisabled: true\`로 두어, **경로 그리기**와 **맵 끌기**가 충돌하지 않게 했습니다.`,

//   `### 3-3. 그릴 때: image → scene`,

//   `\`\`\`ts
// // usePointsRendering 등에서의 골자
// const { scale, offsetX, offsetY } = (canvas as any).meta;
// const canvasX = point.pos_x * scale + offsetX;
// const canvasY = point.pos_y * scale + offsetY;
// \`\`\``,

//   `### 3-4. 누를 때: scene → image **저장**`,

//   `포인터는 **뷰포트를 반영한 뒤**의 **scene**에서 읽습니다.`,

//   `\`\`\`ts
// const pointer = canvas.getScenePoint(e.e);
// const { scale, offsetX, offsetY } = (canvas as any).meta;
// const imageX = (pointer.x - offsetX) / scale;
// const imageY = (pointer.y - offsetY) / scale;
// \`\`\``,

//   `\`pointRenderer\`의 \`object:modified\` 경로에서도 \`(canvasX - offset) / scale\`으로 **left/top**을 **이미지**로 맞춥니다(주석: Fabric \`left\`·\`top\`은 뷰포트 **이전** scene).`,

//   `### 3-5. 줌: 선택이 있을 때 **화면 위치 고정**`,

//   `선택된 포인트가 있으면, \`pos_x\`·\`pos_y\`→\`meta\`로 둔 **scene** 점에 현재 \`getZoom\`·\`viewportTransform\`을 곱해 **지금 화면 좌표**를 구한 뒤, **새 줌**이 들어가도 **그 화면 좌표**가 유지되도록 \`vpt[4]\`, \`vpt[5]\`를 다시 씁니다.`,

//   `\`\`\`ts
// // useCanvasZoom.ts (요지)
// const newZoom = zoomLevel / 100;
// const selectedPoint = /* selectedPointId로 찾기 */;
// if (selectedPoint) {
//   const { scale, offsetX, offsetY } = (canvas as any).meta;
//   const vpt = canvas.viewportTransform!;
//   const pointImageX = selectedPoint.pos_x * scale + offsetX;
//   const pointImageY = selectedPoint.pos_y * scale + offsetY;
//   const currentZoom = canvas.getZoom();
//   const currentScreenX = pointImageX * currentZoom + vpt[4];
//   const currentScreenY = pointImageY * currentZoom + vpt[5];
//   const newVpt: [number, number, number, number, number, number] = [
//     newZoom, vpt[1], vpt[2], newZoom,
//     currentScreenX - pointImageX * newZoom,
//     currentScreenY - pointImageY * newZoom,
//   ];
//   canvas.setViewportTransform(newVpt);
// } else {
//   const cx = (canvas.width ?? 0) / 2;
//   const cy = (canvas.height ?? 0) / 2;
//   canvas.zoomToPoint(new Point(cx, cy), newZoom);
// }
// \`\`\``,

//   `이때 \`useEffect\` **의존성**에서 \`selectedPointId\`·\`points\`를 **빼는** 이유(줌 슬라이더만으로 동작)는 저장소·린트 맥락에 맞게 두었습니다.`,

//   `### 3-6. store와 Fabric: \`usePointSync\` `,

//   `계산한 scene \`(canvasX, canvasY)\`와 아이콘 \`left\`·\`top\`이 **0.5px 미만**이면 건드리지 않아 **떨림**을 줄였고, 밀리면 \`set\`으로 맞췄습니다.`,

//   `### 3-7. 줌 바뀐 뒤: \`after:render\`에서 점 **다시**`,

//   `\`after:render\`에서 \`getZoom\`이 바뀌면 \`clearAllPoints\` 후 \`meta\` 기준으로 **전부** 다시 그리는 흐름이 있어, **뷰**와 **객체**가 엇갈리는 순간을 줄였습니다. \`viewportTransform\`이 **아직 없을 때**는 초기 렌더를 건너뛰는 **가드**가 있어, 이 조건이 비면 첫 화면도 비게 될 수 있으니 운용 시 **주의**가 필요합니다.`,

//   `### 3-8. **DOM**과 \`getScenePoint\` `,

//   `\`MapCanvasContainer\`에서 \`width\`·\`height\` **논리 픽셀**과 \`style\` **표시 크기**를 같게 두는 주석이 있어, \`getScenePoint\`와 **실제 히트**가 엇갈리지 않게 했습니다.`,

//   `---`,

//   `## 4) 정리`,

//   `편집 안정성은 “**한 수식**을 여러 훅이 **같이** 쓰는가”에 가깝습니다. \`pos_x\`·\`pos_y\`는 **데이터**의 뿌리이고, \`meta\`는 **맵이 캔버스에 붙은 뒤의 눈금**이며, \`getScenePoint\`·\`viewportTransform\`은 **손**과 **눈**이 만나는 층입니다. 줌 시 **선택 점**을 **화면에 남기는** \`setViewportTransform\` 보정은, 그 층이 흔들릴 때 사용자가 **대상을 잃지 않게** 하는 **한 번의 고정**이었습니다.`,

//   `> 본문·코드는 Fabric 기반 **맵 편집**(\`InteractiveMapCanvasView\`, \`useCanvasZoom\` 등) 프로젝트를 요약한 것이며, 경로·줄 수는 저장소·브랜치에 따릅니다.`,
// ].join("\n\n");

/**
 * 블로그 글 본문 — `blog-posts.ts`에서 참조
 */
export const MAP_EDIT_FABRIC_ZOOM_STABILITY_MARKDOWN = [
  `Fabric.js 기반 맵 편집 화면에서는 포인트 추가, 드래그, 클릭 이동, 경로 그리기, 줌, 팬이 한 캔버스 위에서 함께 동작해야 했습니다. 기능을 나누는 것보다 더 중요한 문제는 **모든 인터랙션이 같은 좌표 기준을 공유하도록 만드는 것**이었습니다.`,

  `> **한 줄 요약**  
> 맵 편집 화면에는 image 좌표, scene 좌표, screen 좌표가 함께 존재했습니다.  
> 저장 좌표는 image 좌표로 고정하고, 렌더링은 \`image → scene → screen\`, 입력은 \`screen → scene → image\` 흐름으로 맞췄습니다.  
> 특히 선택 포인트가 있는 상태에서 줌이 바뀔 때는 viewport 이동값을 보정해, 편집 중인 포인트가 화면에서 같은 위치에 유지되도록 했습니다.`,

  `---`,

  `## 1) 문제 상황`,

  `맵 편집 화면에서는 포인트 추가, 포인트 드래그, 경로 그리기, 클릭 이동, 줌, 팬 같은 인터랙션이 동시에 필요했습니다. 각 기능은 훅으로 분리할 수 있었지만, 좌표 기준이 서로 다르면 같은 포인트를 다루면서도 위치가 조금씩 어긋날 수 있었습니다.`,

  `맵 이미지는 캔버스에 원본 크기 그대로 올라가지 않습니다. 화면 크기에 맞춰 스케일링되고 중앙 정렬됩니다. 따라서 포인트 데이터의 \`pos_x\`, \`pos_y\`는 원본 맵 이미지 기준 좌표이고, Fabric 객체의 \`left\`, \`top\`은 viewport transform이 적용되기 전의 캔버스 scene 좌표로 다뤘습니다. 여기에 줌이나 팬이 적용되면 사용자가 실제로 보는 위치는 다시 screen 좌표가 됩니다.`,

  `즉, 편집 화면에는 최소 세 가지 좌표 기준이 함께 존재했습니다.`,

  `| 좌표 기준 | 의미 |
| --- | --- |
| image 좌표 | 원본 맵 이미지 기준 좌표. \`pos_x\`, \`pos_y\` |
| scene 좌표 | Fabric 캔버스 내부 좌표. 객체의 \`left\`, \`top\` |
| screen 좌표 | 줌과 팬이 적용된 뒤 사용자가 화면에서 보는 위치 |`,

  `줌이나 팬이 없는 상태에서는 이 차이가 크게 드러나지 않을 수 있습니다. 하지만 맵을 확대하거나 이동한 뒤 포인트를 편집하면, 선택된 포인트의 내부 좌표와 화면 위치가 미세하게 어긋날 수 있었습니다.`,

  `특히 zoom 값만 바꾸고 viewport 이동값을 기존 기준으로 유지하면, 선택 포인트의 scene 좌표는 같아도 screen 좌표는 달라질 수 있습니다. 사용자는 특정 포인트를 기준으로 확대한다고 느끼는데, 줌 변경 후 그 포인트가 화면에서 밀려나면 편집 흐름이 끊깁니다.`,

  `그래서 포인트 저장 좌표, 캔버스 렌더링 좌표, 사용자 입력 좌표의 역할을 명확히 나누고, 각 인터랙션이 같은 변환 기준을 사용하도록 정리할 필요가 있었습니다.`,

  `---`,

  `## 2) 좌표 기준을 어떻게 나눴는지`,

  `먼저 포인트의 원본 데이터는 image 좌표로 유지했습니다. \`pos_x\`, \`pos_y\`는 맵 이미지 위의 실제 위치를 의미해야 하므로, 줌이나 팬 같은 화면 조작에 따라 값이 바뀌면 안 됩니다. 줌과 팬은 화면을 보는 방식만 바꾸는 동작이고, 포인트 자체의 맵 기준 위치를 바꾸는 동작은 아니기 때문입니다.`,

  `반대로 Fabric 객체의 \`left\`, \`top\`은 캔버스에 포인트를 표시하기 위한 scene 좌표로 다뤘습니다. 맵 배경이 캔버스에 적용될 때 계산한 \`scale\`, \`offsetX\`, \`offsetY\`를 \`canvas.meta\`에 저장하고, 포인트를 렌더링할 때는 이 값을 기준으로 image 좌표를 scene 좌표로 변환했습니다.`,

  `\`\`\`text
image 좌표(pos_x, pos_y)
→ canvas.meta(scale, offset)를 반영한 scene 좌표
→ viewport transform을 통해 screen 좌표로 표시
\`\`\``,

  `사용자가 클릭하거나 드래그하는 입력은 반대 방향으로 처리했습니다. 입력은 화면에서 발생하지만, 저장해야 하는 값은 다시 image 좌표입니다. 그래서 \`getScenePoint\`로 screen 입력을 scene 좌표로 바꾸고, \`canvas.meta\`를 기준으로 image 좌표로 되돌렸습니다.`,

  `\`\`\`text
screen 입력
→ getScenePoint로 scene 좌표 변환
→ canvas.meta(scale, offset) 기준으로 image 좌표 변환
→ pos_x, pos_y로 저장
\`\`\``,

  `이렇게 하면 렌더링과 인터랙션이 서로 반대 방향의 변환을 사용하더라도 같은 기준을 공유할 수 있습니다.`,

  `또 하나 중요했던 부분은 줌 기준이었습니다. 일반적인 중앙 기준 zoom은 맵 전체를 볼 때는 자연스럽지만, 특정 포인트를 편집하는 중에는 사용자가 보고 있던 대상이 화면에서 밀려날 수 있습니다. 그래서 선택 포인트가 있을 때는 해당 포인트의 현재 screen 좌표를 계산하고, zoom 변경 후에도 같은 screen 좌표에 남도록 viewport 이동값을 보정했습니다.`,

  `단순히 훅을 나누는 것이 목적은 아니었습니다. 각 훅이 서로 다른 좌표 공식을 갖지 않도록, \`canvas.meta\`와 Fabric scene 좌표를 공통 기준으로 사용하게 하는 것이 핵심이었습니다.`,

  `---`,

  `## 3) 구현`,

  `### 3-1. 편집 인터랙션을 훅 단위로 나눴습니다`,

  `\`InteractiveMapCanvasView\`에서는 Fabric 캔버스를 중심으로 줌, 팬, 포인트 렌더링, 드래그, 위치 동기화, 클릭 이동, 경로 그리기 훅을 조합했습니다.`,

  `\`\`\`tsx
useCanvasZoom({
  canvas,
  isReady,
  zoomLevel,
  selectedPointId,
  points,
});

useCanvasPan({
  canvas,
  isReady,
  isDisabled: currentView === "add_point" && isPathMode,
});

usePointsRendering({ /* point rendering */ });
usePointDragEvents({ canvas, onUpdatePoint: onEditPoint || onUpdatePoint });
usePointSync({ canvas, isReady, selectedPointId, points });
usePointClickMove({ canvas, isReady, selectedPointId, points });
usePathDrawing({ /* path mode */ });
\`\`\``,

  `편집 화면은 여러 인터랙션이 동시에 필요했기 때문에, 모든 로직을 컴포넌트에 직접 넣지 않았습니다. 대신 각 훅이 하나의 인터랙션만 담당하고, 좌표 계산은 \`canvas.meta\`와 scene 좌표 기준을 공유하도록 맞췄습니다.`,

  `### 3-2. 포인트 데이터는 image 좌표로 유지했습니다`,

  `저장되는 포인트 좌표는 \`pos_x\`, \`pos_y\`입니다. 이 값은 원본 맵 이미지 기준이므로 줌이나 팬에 의해 바뀌면 안 됩니다. 캔버스에 표시할 때만 \`scale\`, \`offsetX\`, \`offsetY\`를 반영해 scene 좌표로 변환했습니다.`,

  `\`\`\`ts
const canvasX = point.pos_x * scale + offsetX;
const canvasY = point.pos_y * scale + offsetY;
\`\`\``,

  `이 기준은 포인트 렌더링뿐 아니라 \`usePointSync\`에서도 사용했습니다. store에 있는 좌표와 Fabric 객체의 \`left\`, \`top\`이 어긋나지 않도록 같은 공식을 사용해 위치를 맞췄습니다.`,

  `### 3-3. 드래그와 클릭 입력은 image 좌표로 되돌렸습니다`,

  `사용자가 클릭하거나 드래그한 위치는 화면 기준 입력입니다. Fabric에서는 \`getScenePoint\`를 통해 현재 viewport transform이 반영된 입력 위치를 scene 좌표로 얻을 수 있습니다. 이후 \`canvas.meta\`의 \`scale\`, \`offsetX\`, \`offsetY\`를 이용해 image 좌표로 되돌렸습니다.`,

  `\`\`\`ts
const pointer = canvas.getScenePoint(e.e);

const imageX = (pointer.x - offsetX) / scale;
const imageY = (pointer.y - offsetY) / scale;
\`\`\``,

  `드래그가 끝난 뒤에도 같은 기준을 사용했습니다. Fabric 객체의 \`left\`, \`top\`은 viewport transform이 적용되기 전의 scene 좌표로 보고, 다시 image 좌표로 환산해 \`pos_x\`, \`pos_y\`에 저장했습니다.`,

  `### 3-4. 선택 포인트 기준으로 zoom을 보정했습니다`,

  `이 글에서 가장 중요했던 부분은 줌 변경 시 선택 포인트의 화면 위치를 유지하는 로직입니다. 선택 포인트가 있는 경우에는 먼저 \`pos_x\`, \`pos_y\`를 scene 좌표로 변환하고, 현재 zoom과 viewport 이동값으로 현재 screen 좌표를 계산했습니다.`,

  `그 다음 새로운 zoom이 적용되어도 같은 screen 좌표에 남도록 viewport의 이동값을 다시 계산했습니다.`,

  `\`\`\`ts
const pointSceneX = selectedPoint.pos_x * scale + offsetX;
const pointSceneY = selectedPoint.pos_y * scale + offsetY;

const currentScreenX = pointSceneX * currentZoom + vpt[4];
const currentScreenY = pointSceneY * currentZoom + vpt[5];

const newVpt: [number, number, number, number, number, number] = [
  newZoom,
  vpt[1],
  vpt[2],
  newZoom,
  currentScreenX - pointSceneX * newZoom,
  currentScreenY - pointSceneY * newZoom,
];

canvas.setViewportTransform(newVpt);
\`\`\``,

  `선택 포인트가 없는 경우에는 기존처럼 캔버스 중앙을 기준으로 zoom을 적용했습니다. 하지만 선택 포인트가 있는 경우에는 해당 포인트가 현재 화면에서 보이던 위치에 그대로 남도록 viewport 이동값을 계산했습니다.`,

  `이렇게 하면 확대하거나 축소하는 동안에도 편집 대상이 화면에서 밀려나지 않고, 사용자가 보고 있던 위치에 유지됩니다.`,

  `### 3-5. store와 Fabric 객체 위치를 동기화했습니다`,

  `\`usePointSync\`에서는 store의 \`pos_x\`, \`pos_y\`를 기준으로 scene 좌표를 계산하고, Fabric 객체의 위치와 비교했습니다. 차이가 거의 없는 경우에는 업데이트를 건너뛰고, 일정 이상 어긋난 경우에만 객체 위치를 보정했습니다.`,

  `\`\`\`ts
const pointSceneX = point.pos_x * scale + offsetX;
const pointSceneY = point.pos_y * scale + offsetY;

if (
  Math.abs(icon.left! - pointSceneX) < 0.5 &&
  Math.abs(icon.top! - pointSceneY) < 0.5
) {
  return;
}

icon.set({
  left: pointSceneX,
  top: pointSceneY,
});
\`\`\``,

  `이렇게 하면 store 기준 좌표와 캔버스 객체 위치가 계속 같은 기준을 유지하면서도, 미세한 오차까지 매번 반영해 불필요한 업데이트가 발생하는 상황을 줄일 수 있습니다.`,

  `### 3-6. path 모드에서는 pan을 비활성화했습니다`,

  `경로 편집 모드에서는 드래그 입력이 path 작성에 사용되어야 합니다. 이때 pan 기능이 함께 활성화되어 있으면 같은 mouse event가 “경로 그리기”와 “맵 이동”으로 동시에 해석될 수 있습니다.`,

  `그래서 path 모드에서는 \`useCanvasPan\`에 \`isDisabled\` 값을 넘겨 pan을 비활성화했습니다.`,

  `\`\`\`tsx
useCanvasPan({
  canvas,
  isReady,
  isDisabled: currentView === "add_point" && isPathMode,
});
\`\`\``,

  `이렇게 해서 경로 편집 중에는 드래그 입력이 path 작성에만 사용되도록 분리했습니다.`,

  `---`,

  `## 4) 정리`,

  `맵 편집 화면에서 좌표 문제는 단순히 포인트를 어디에 그릴지의 문제가 아니었습니다. 저장 좌표, 캔버스 내부 좌표, 화면에 보이는 좌표가 서로 다른 기준을 가지고 있었고, 줌과 팬이 적용되면 이 차이가 더 쉽게 드러났습니다.`,

  `그래서 포인트의 저장 기준은 image 좌표로 고정하고, 렌더링은 \`image → scene → screen\`, 입력은 \`screen → scene → image\` 흐름으로 정리했습니다. 또한 선택 포인트가 있을 때는 zoom 변경 후에도 같은 screen 위치에 남도록 viewport 이동값을 보정했습니다.`,

  `그 결과 확대, 축소, 드래그, 클릭 이동, 경로 편집이 같은 좌표 기준을 공유하게 되었고, 편집 중인 포인트가 화면에서 밀려나는 문제를 줄일 수 있었습니다.`,
].join("\n\n");
