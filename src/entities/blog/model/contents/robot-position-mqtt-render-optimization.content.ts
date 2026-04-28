// /**
//  * 블로그 본문 — `blog-posts.ts`에서 참조
//  * MQTT robot_pose: 수신 누적·폴링·RobotPosition·렌더 절감
//  */
// export const ROBOT_POSITION_MQTT_RENDER_OPTIMIZATION_MARKDOWN = [
//   `> **한 줄 요약**
// >
// > 로봇 위치(\`robot_pose\`)는 MQTT로 **아주 자주** 올 수 있습니다. 그런데 화면에 꼭 필요한 것은 **“지금 막 받은 최신 한 번”**에 가깝습니다. 그래서 **① 받을 때**는 일단 스토어에 **차곡차곡 쌓고**, **② 화면에 반영할 때**는 1초마다 같은 토픽의 **맨 마지막 것만** 골라 쓰며, **우리가 붙인 수신 시각**으로 **이미 처리한 줄**은 건너뜁니다. **③ 그릴 때**는 \`u\`/\`v\`·\`x\`/\`y\` 차이를 \`RobotPosition\` 한 모양으로 맞춘 뒤, **숫자가 안 바뀌면** React state는 **이전 객체 그대로**(\`prev\`) 돌려주고, 캔버스도 **(x,y)가 같으면** 마커를 다시 안 움직입니다. (다만 마커 **깜빡임**을 위해 0.5초마다 \`requestRenderAll\`을 도는 부분은 **별도**로 남을 수 있습니다.)`,

//   `---`,

//   `## 1) 무엇이 불편했는지`,

//   `모니터링 화면에서 로봇 **위치**는 MQTT로 **짧은 간격**에 계속 들어옵니다. **올 때마다** 곧바로 state를 바꾸고 캔버스를 다시 그리면, **좌표가 똑같은데도** “또 갱신”이 일어나거나, **이미 반영한 메시지**를 다시 읽어 **헛도는 그림**이 반복될 수 있었습니다.`,

//   `문제를 “메시지가 많다”만으로 보기엔 부족합니다. **① 메시지를 받는 일**, **② 화면용 숫자로 바꿔 저장하는 일**, **③ 맵 위에 점을 그리는 일**이 한 줄로 엮이면, **사실은 바뀐 게 없는데도** \`setState\`와 \`requestRenderAll\`(다시 그려라)까지 타기 쉽습니다.`,

//   `또 한 가지는 **들어오는 JSON 모양**이 달랐다는 점입니다. 어떤 때는 \`u\`, \`v\`처럼 **맵에 가까운 숫자**로 오고, 어떤 때는 \`x\`, \`y\`로 옵니다. 캔버스 코드가 매번 “이번엔 어떤 필드지?”를 알아야 하면, 나중에 로봇 종류·토픽이 늘어날수록 **고칠 곳이 사방**으로 퍼집니다.`,

//   `맵 위 점(마커)은 **위치 숫자가 바뀔 때만** 옮기면 됩니다. 그런데 **객체 참조만 새로 만들어지고 (x,y)는 같은**데도 매번 마커를 옮기고 캔버스 전체를 다시 그리면, 작은 일이 **쌓여서** 느려지거나 화면이 들쭉날쭉해 보일 수 있었습니다.`,

//   `그래서 **(1)** 같은 말을 state에 또 넣지 않기, **(2)** 그리기 전에 **한 가지 모양**으로 맞추기, **(3)** 숫자가 안 바뀌면 state·그림 둘 다 **가볍게 넘기기**가 필요했습니다.`,

//   `---`,

//   `## 2) 왜 “받기 / 반영하기 / 그리기”로 나눴는지`,

//   `**① 받기(수신)**
// MQTT \`on('message')\`에서 **받자마자 맵을 그리지 않고**, “어떤 토픽인지(\`topic\`)”, “안에 무엇이 있는지(\`payload\`)”, “**우리가 받은 순간은 언제인지**”를 한 덩어리로 만들어 \`messages\` 배열 **끝에 붙였습니다**. 여기서 붙인 시각을 아래에서 **“이 줄은 이미 처리했다”**는 표시에 씁니다. **로봇이 보내는 속도**와 **사람이 보기에 필요한 갱신 속도**는 같을 필요가 없습니다.`,

//   `**② 반영하기(업데이트)**
// 지금 보고 있는 로봇의 \`robot_pose/res\`만 \`getMessagesByTopic\`으로 골라 냅니다(라이다 설정에 따라 **토픽 문자열**이 달랐습니다). 그다음 **1초마다** 그중 **맨 마지막 메시지**만 봅니다. 이때 **맨 마지막 줄의 “우리가 붙인 시각”**이, 직전에 처리한 시각과 같거나 더 예전이면 **아무 것도 하지 않고** return합니다. 같은 줄을 **여러 번 처리**하지 않기 위함입니다. **로봇 payload 안의 시간**과 **헷갈리지 않도록**, 여기서 쓰는 시각은 **수신할 때 싼 값**이었습니다.`,

//   `**③ 그리기(렌더)**
// payload를 \`RobotPosition\`(\`x, y, yaw, tilt_angle, timestamp\`)으로 맞춘 뒤, \`setMqttRobotPosition\`에서 **\`x, y, yaw\`가 직전과 같으면** \`prev\`를 그대로 돌려줍니다. React는 “state가 안 바뀌었구나”로 받아들여 **불필요한 리렌더**를 줄일 수 있습니다. 그 다음 \`useRobotPositionRenderer\`에서 **직전에 그린 (x,y)**와 비교해 같으면 \`updateRobotMarker\`를 **아예 호출하지 않**습니다.`,

//   `이렇게 나누면 **맵을 그리는 코드**는 “토픽 이름이 뭐였지”, “\`u\`였나 \`x\`였나”를 몰라도 되고, **정해진 숫자 네 개**만 받아서 옮기면 됩니다.`,

//   `---`,

//   `## 3) 코드로 보면 이렇게 붙어 있었습니다`,

//   `### 3-1. \`RobotPosition\` — 화면이 기억하는 위치는 **한 모양**`,

//   `맵·패널이 공통으로 쓰기 쉽게, 위치를 **항상 같은 필드 이름**으로 맞췄습니다.`,

//   `\`\`\`ts
// export interface RobotPosition {
//   x: number;
//   y: number;
//   yaw: number;
//   tilt_angle: number;
//   timestamp: number;
// }
// // Zustand 예: store에 넣을 때 이름을 붙여 디버깅하기 쉽게
// // setRobotPosition: (p: RobotPosition) =>
// //   set({ robotPosition: p }, false, "setRobotPosition");
// \`\`\``,

//   `**기기 정보 스토어**에는 \`setRobotPosition\`으로 \`robotPosition\`을 넣는 **한 줄짜리 문**이 있었고, TEMI 화면(\`StatusTemi\`)은 \`MapViewer\`의 \`setMqttRobotPosition\`과 **다른 줄**에서 \`setRobotPosition\`을 부를 수 있었습니다. (아래 3-4)`,

//   `### 3-2. MQTT — **일단 다 쌓고**, 토픽으로 **나중에 골라 읽기**`,

//   `와이파이처럼 계속 들어오는 메시지를 **한 배열**에 쌓습니다. \`robot_pose\`만은 콘솔 로그에서 빼서, **콘솔이 잠기지 않게** 했습니다.`,

//   `\`\`\`ts
// client.on("message", (topic, payload) => {
//   const jsonData = JSON.parse(new TextDecoder().decode(payload));
//   const message: MQTT_MESSAGE = { topic, payload: jsonData, timestamp: Date.now() };
//   if (!topic.includes("robot_pose")) {
//     console.log("[MQTT] 수신", { topic, payloadKeys: jsonData });
//   }
//   set((s) => ({ messages: [...s.messages, message] }));
// });
// \`\`\``,

//   `토픽 이름으로만 골라낼 때는 아래처럼 **filter**를 썼습니다.`,

//   `\`\`\`ts
// getMessagesByTopic: (topic: string) => {
//   const { messages } = get();
//   return messages.filter((msg) => msg.topic === topic);
// };
// \`\`\``,

//   `다만 **오래 두면 배열이 무한히 길어질 수 있다**는 점은 남습니다. \`clearMessages\`는 있어도 “pose만 주기적으로 비우기”는 당시 없었으니, 나중에 **토픽마다 최신 하나만 남기기**·**최대 N개까지만** 같은 식으로 다듬을 여지가 있었습니다.`,

//   `### 3-3. \`MapViewer\` — **1초에 한 번**, “맨 끝 줄”만`,

//   `라이다 타입이 1이면 \`…/별칭/robot_pose/res\`, 아니면 \`lidar_folder_name\`이 들어간 경로처럼 **pose 토픽 문자열**이 달랐습니다.`,

//   `\`\`\`ts
// const checkPoseMessages = () => {
//   const messages = getMessagesByTopic(poseTopic);
//   if (messages.length === 0) return;
//   const latestMessage = messages.at(-1)!;
//   if (latestMessage.timestamp <= lastProcessedTimestampRef.current) return;
//   lastProcessedTimestampRef.current = latestMessage.timestamp;
//   const payload = latestMessage.payload;
//   if (typeof payload.u === "number" && typeof payload.v === "number") {
//     setMqttRobotPosition((prev) => {
//       const newPos: RobotPosition = {
//         x: payload.u,
//         y: payload.v,
//         yaw: payload.yaw ?? 0,
//         tilt_angle: payload.tilt_angle ?? 0,
//         timestamp: latestMessage.timestamp,
//       };
//       if (prev && prev.x === newPos.x && prev.y === newPos.y && prev.yaw === newPos.yaw) {
//         return prev;
//       }
//       return newPos;
//     });
//   } else if (typeof payload.x === "number" && typeof payload.y === "number") {
//     // 위와 같은 방식으로 newPos 만들고 prev 비교
//   }
// };
// // setInterval(checkPoseMessages, 1000);
// \`\`\``,

//   `맵 컴포넌트에는 \`robotPosition={mqttRobotPosition}\`처럼 **prop**으로 넘겨, 이 경로에선 **스토어에 들어 있는 값보다** MapViewer가 들고 있는 값이 **먼저** 쓰이게 했습니다.`,

//   `### 3-4. TEMI — **다른 문**으로 store에 직접`,

//   `\`messages\`의 **맨 끝**을 보다가, TEMI \`state/res\` 토픽이면 \`pos\`의 \`x, y, yaw, tilt_angle\`로 **곧바로** \`setRobotPosition\`을 호출하는 코드가 **또** 있었습니다. 여기서는 **“직전과 같은 좌표인지”**를 보지 **않았습니다**.`,

//   `\`InteractiveMapCanvasView\`는 대략 \`prop으로 받은 위치 ?? (모니터링이면 store 위치)\`처럼 동작합니다. 그래서 **prop이 없는** TEMI 쪽은 store의 \`robotPosition\`이 맵에 쓰일 수 있고, **MapViewer**는 prop으로 \`mqttRobotPosition\`을 넘기므로 **어느 줄이 먼저 쓰이는지**가 갈렸습니다. 나중에 **“두 줄을 한 규칙으로 맞출지”**는 따로 정리할 수 있는 부분이었습니다.`,

//   `### 3-5. 캔버스 훅 — **(x,y)가 같으면 그리지 않기**`,

//   `마커가 원이라 **위치(x,y)만 같으면** 화면에서 겹쳐 보입니다. 그래서 \`yaw\`만 바뀌어도 (x,y)가 같으면 **굳이 다시 그리지 않는** 선택을 했습니다.`,

//   `\`\`\`ts
// function hasPositionChanged(
//   current: { x: number; y: number },
//   previous: { x: number; y: number } | null
// ): boolean {
//   if (!previous) return true;
//   return current.x !== previous.x || current.y !== previous.y;
// }
// const currentPos = { x: robotPosition.x, y: robotPosition.y };
// if (!hasPositionChanged(currentPos, lastRenderedPositionRef.current)) return;
// lastRenderedPositionRef.current = currentPos;
// const canvasPos = toCanvasCoordinates(robotPosition, mapInfo, meta);
// updateRobotMarker(canvas, canvasPos.x, canvasPos.y);
// \`\`\``,

//   `**깜빡임**은 0.5초마다 \`opacity\`를 바꾸며 \`canvas.requestRenderAll()\`을 부르는 **또 다른 타이머**가 있었습니다. 그래서 “**안 움직여도** 주기적으로 다시 그림”이 남을 수 있었고, **이동** 때문에 생기던 부하는 줄였지만 **애니메이션** 부하는 **완전히 없어지진 않았습니다**. 깜빡임을 **CSS나 다른 방식**으로 옮기면 여기까지 줄일 수 있습니다.`,

//   `### 3-6. \`MonitoringInfoPanel\` — 숫자도 **같은 위치**를`,

//   `맵 옆 패널에서 \`x\`, \`y\` **숫자**를 보여 줄 때도, 캔버스가 쓰는 \`robotPosition\`과 **같은 값**을 쓰도록 맞춰 두면 “맵과 숫자가 어긋난다”는 혼란을 줄일 수 있습니다.`,

//   `\`\`\`ts
// // 깜빡임으로 인한 별도 부하(요지)
// // setInterval(() => {
// //   circle.set({ opacity: isVisible ? 1 : 0.3 });
// //   canvas.requestRenderAll();
// // }, 500);
// \`\`\``,

//   `---`,

//   `## 4) 한눈에: 하려던 일 ↔ 코드에 어디 붙었는지`,

//   `| 하려던 일 | 당시 코드에서의 모습 |
// |------------|----------------------|
// | 받기 / 반영 / 그리기 나누기 | MQTT는 \`messages\`에 쌓고, MapViewer는 **1초마다** 마지막만 읽고, \`useRobotPositionRenderer\`가 맵에 점을 찍음 |
// | “이미 처리한 줄” 건너뛰기 | 메시지에 붙인 **수신 시각** + \`lastProcessedTimestampRef\` |
// | 숫자가 같으면 state 안 바꾸기 | \`setMqttRobotPosition\`에서 \`x,y,yaw\` 같으면 \`prev\` 그대로 |
// | (x,y) 같으면 마커 안 움직이기 | \`hasPositionChanged\` + \`lastRenderedPositionRef\` |
// | 모양 통일 | \`RobotPosition\` |
// | pose만 따로 짧은 큐 | **없음** — 긴 배열 + 토픽으로 골라 읽기 + 1초 주기에 가깝 |`,

//   `---`,

//   `## 6) 마치며 `,

//   `**“얼마나 자주 오느냐”**와 **“얼마나 자주 그려야 하느냐”**는 같지 않습니다. **받은 걸 다 쌓아 두고**, 화면은 **필요한 만큼만** 골라 **한 모양**으로 맞춘 다음, **숫자가 안 바뀌면** React와 캔버스 **둘 다 가볍게** 넘기면, 실시간 맵이 훨씬 **안정적으로** 보입니다.`,
// ].join("\n\n");

/**
 * 블로그 본문 — `blog-posts.ts`에서 참조
 * MQTT robot_pose: 수신 누적·폴링·RobotPosition·렌더 절감
 */
export const ROBOT_POSITION_MQTT_RENDER_OPTIMIZATION_MARKDOWN = [
  `> **한 줄 요약**  
>  
> 로봇 위치(\`robot_pose\`)는 MQTT로 짧은 주기로 수신됩니다. 하지만 화면에 필요한 것은 매번 모든 메시지가 아니라 현재 시점의 최신 위치입니다. 그래서 수신 단계에서는 메시지를 스토어에 저장하고, 화면 반영 단계에서는 1초마다 같은 토픽의 마지막 메시지만 확인했습니다. 이후 **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기)로 같은 줄을 반복 처리하지 않았고, \`u/v\` 또는 \`x/y\` 형태의 **payload**(메시지 안의 실제 데이터)를 \`RobotPosition\`으로 **정규화**(형식을 하나로 맞추기)했습니다. 마지막으로 좌표가 같으면 React state를 갱신하지 않고, 캔버스에서도 \`(x, y)\`가 같으면 **캔버스 마커 업데이트 스킵**(위치가 같으면 마커를 다시 움직이지 않기)에 해당해 마커 이동을 생략했습니다. 다만 마커 깜빡임을 위한 주기적 \`requestRenderAll\`은 별도 부하로 남아 있었습니다.`,

  `---`,

  `## 1) 무엇이 문제였는지`,

  `모니터링 화면에서 로봇 위치는 MQTT로 짧은 간격에 계속 들어옵니다. 수신할 때마다 곧바로 state를 바꾸고 캔버스를 다시 그리면, 좌표가 동일한데도 상태 갱신과 마커 렌더링이 반복될 수 있었습니다.`,

  `문제는 단순히 메시지 수가 많다는 점이 아니었습니다. 메시지를 수신하는 일, 화면에서 사용할 위치 값으로 변환하는 일, 캔버스에 마커를 그리는 일이 한 흐름으로 묶이면 실제로 바뀐 값이 없어도 \`setState\`와 \`requestRenderAll\`까지 이어질 수 있었습니다.`,

  `또한 위치 **payload**(메시지 안의 실제 데이터)의 형식도 항상 같지 않았습니다. 어떤 데이터는 \`u\`, \`v\`처럼 맵 픽셀 좌표에 가까운 값으로 들어오고, 어떤 데이터는 \`x\`, \`y\` 형태로 들어왔습니다. 캔버스 렌더링 코드가 매번 원본 payload의 형식을 직접 판단하면, 로봇 종류나 토픽이 늘어날수록 위치 처리 기준이 여러 곳으로 흩어질 수 있었습니다.`,

  `마커는 위치가 바뀔 때만 이동하면 됩니다. 그런데 객체 참조만 새로 만들어지고 실제 \`(x, y)\` 값은 같은 경우에도 매번 마커를 다시 옮기면, 작은 갱신 비용이 누적되어 화면이 불안정해 보이거나 렌더링 비용이 커질 수 있었습니다.`,

  `그래서 위치 데이터 처리 흐름을 수신, 반영, 렌더링 단계로 나누고 각 단계에서 중복 메시지와 동일 좌표를 걸러낼 필요가 있었습니다.`,

  `---`,

  `## 2) 왜 수신 / 반영 / 렌더링으로 나눴는지`,

  `**① 수신 단계**  
MQTT \`on('message')\`에서는 메시지를 받자마자 캔버스를 갱신하지 않고, \`topic\`, **payload**(메시지 안의 실제 데이터), 수신 시각을 하나의 **message envelope**(메시지를 저장할 때 만든 객체)로 만들어 \`messages\` 배열에 저장했습니다. 여기서 저장한 수신 시각은 이후 **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기)에 쓰였습니다. 로봇이 데이터를 보내는 빈도와 화면이 갱신되어야 하는 빈도는 같을 필요가 없다고 판단했습니다.`,

  `**② 반영 단계**  
모니터링 화면에서는 현재 보고 있는 로봇의 \`robot_pose/res\` 토픽만 필터링했습니다. 라이다 설정에 따라 토픽 문자열이 달라질 수 있으므로, 화면에서 필요한 pose 토픽을 먼저 결정한 뒤 1초마다 해당 토픽의 마지막 메시지만 확인했습니다.`,

  `1초마다 배열의 마지막 메시지를 확인하는 구조에서는 새 메시지가 없을 때도 같은 마지막 메시지를 다시 조회할 수 있습니다. 그래서 **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기)를 위해 마지막으로 처리한 수신 시각을 \`lastProcessedTimestampRef\`에 저장하고, 이미 처리한 메시지는 건너뛰었습니다. 이때 사용하는 \`timestamp\`는 로봇 **payload**(메시지 안의 실제 데이터) 내부 시간이 아니라, 메시지를 수신할 때 감싼 **message envelope**(메시지를 저장할 때 만든 객체)에 붙인 수신 시각입니다.`,

  `**③ 렌더링 단계**  
**payload**(메시지 안의 실제 데이터)는 먼저 \`RobotPosition\` 구조로 **정규화**(형식을 하나로 맞추기)했습니다. 이후 \`setMqttRobotPosition\`에서 이전 값과 새 값의 \`x\`, \`y\`, \`yaw\`가 같으면 기존 state 객체를 그대로 반환했습니다. React state 단계에서 동일 데이터를 한 번 걸러주고, 캔버스 렌더러에서도 마지막으로 그린 \`(x, y)\`와 비교해 위치가 같으면 \`updateRobotMarker\`를 호출하지 않아 **캔버스 마커 업데이트 스킵**(위치가 같으면 마커를 다시 움직이지 않기)에 해당했습니다.`,

  `이렇게 나누면 캔버스 렌더링 코드는 원본 토픽 이름이나 **payload**(메시지 안의 실제 데이터) 필드 차이를 알 필요가 없습니다. **정규화**(형식을 하나로 맞추기)된 위치 모델만 받아서 마커를 표시하는 역할에 집중할 수 있습니다.`,

  `---`,

  `## 3) 코드로 보면 이렇게 연결됩니다`,

  `### 3-1. \`RobotPosition\` — 위치 모델을 하나로 맞췄습니다`,

  `맵과 상태 패널에서 같은 기준으로 위치를 다룰 수 있도록, 위치 데이터를 \`RobotPosition\` 구조로 **정규화**(형식을 하나로 맞추기)했습니다.`,

  `\`\`\`ts
export interface RobotPosition {
  x: number;
  y: number;
  yaw: number;
  tilt_angle: number;
  timestamp: number;
}

// Zustand 예시
// setRobotPosition: (position: RobotPosition) =>
//   set({ robotPosition: position }, false, "setRobotPosition");
\`\`\``,

  `이 구조를 기준으로 맞춰두면, 이후 렌더링 단계에서는 **payload**(메시지 안의 실제 데이터)가 \`u/v\`로 들어왔는지 \`x/y\`로 들어왔는지 신경 쓰지 않아도 됩니다.`,

  `### 3-2. MQTT — 수신한 메시지를 먼저 저장했습니다`,

  `MQTT 메시지는 수신 즉시 화면에 반영하지 않고 \`messages\` 배열에 저장했습니다. \`robot_pose\` 토픽은 짧은 주기로 계속 들어오기 때문에 콘솔 로그에서는 제외했습니다.`,

  `\`\`\`ts
client.on("message", (topic, payload) => {
  const jsonData = JSON.parse(new TextDecoder().decode(payload));

  const message: MQTT_MESSAGE = {
    topic,
    payload: jsonData,
    timestamp: Date.now(),
  };

  if (!topic.includes("robot_pose")) {
    console.log("[MQTT] 수신", { topic, payloadKeys: jsonData });
  }

  set((state) => ({
    messages: [...state.messages, message],
  }));
});
\`\`\``,

  `토픽별로 메시지를 가져올 때는 \`getMessagesByTopic\`을 사용했습니다.`,

  `\`\`\`ts
getMessagesByTopic: (topic: string) => {
  const { messages } = get();
  return messages.filter((msg) => msg.topic === topic);
};
\`\`\``,

  `다만 이 구조에서는 메시지가 배열에 계속 누적될 수 있습니다. \`clearMessages\`는 있었지만 pose 토픽만 주기적으로 비우는 로직은 없었기 때문에, 이후에는 토픽별 최신 메시지만 유지하거나 최대 개수를 제한하는 방식으로 개선할 수 있습니다.`,

  `### 3-3. \`MapViewer\` — 1초마다 최신 pose 메시지만 확인했습니다`,

  `모니터링 화면에서는 현재 로봇의 \`robot_pose/res\` 토픽을 기준으로 메시지를 필터링했습니다. 라이다 타입에 따라 토픽 경로가 달라질 수 있으므로, 먼저 pose 토픽 문자열을 결정한 뒤 1초마다 마지막 메시지를 확인했습니다.`,

  `\`\`\`ts
const checkPoseMessages = () => {
  const messages = getMessagesByTopic(poseTopic);
  if (messages.length === 0) return;

  const latestMessage = messages.at(-1)!;

  if (latestMessage.timestamp <= lastProcessedTimestampRef.current) {
    return;
  }

  lastProcessedTimestampRef.current = latestMessage.timestamp;

  const payload = latestMessage.payload;

  if (typeof payload.u === "number" && typeof payload.v === "number") {
    setMqttRobotPosition((prev) => {
      const newPos: RobotPosition = {
        x: payload.u,
        y: payload.v,
        yaw: payload.yaw ?? 0,
        tilt_angle: payload.tilt_angle ?? 0,
        timestamp: latestMessage.timestamp,
      };

      if (
        prev &&
        prev.x === newPos.x &&
        prev.y === newPos.y &&
        prev.yaw === newPos.yaw
      ) {
        return prev;
      }

      return newPos;
    });
  } else if (typeof payload.x === "number" && typeof payload.y === "number") {
    // 같은 방식으로 RobotPosition을 만들고 prev와 비교합니다.
  }
};

// setInterval(checkPoseMessages, 1000);
\`\`\``,

  `이 방식에서는 MQTT로 들어온 모든 위치 메시지를 즉시 반영하지 않습니다. 현재 화면에서 필요한 pose 토픽의 마지막 메시지만 확인하고, 그 메시지도 **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기)에 해당하면 건너뜁니다.`,

  `맵 컴포넌트에는 \`robotPosition={mqttRobotPosition}\`처럼 **prop으로 받은 위치**(바깥에서 직접 넘겨받은 위치 값)를 넘겼습니다. 이 경로에서는 **store \`robotPosition\`**(전역 상태에 저장된 위치 값)보다 MapViewer가 들고 있는 \`mqttRobotPosition\`이 우선 사용됩니다.`,

  `### 3-4. TEMI — 별도 경로로 store에 직접 반영했습니다`,

  `TEMI 상태 메시지는 \`messages\`의 마지막 값을 확인하다가 특정 \`state/res\` 토픽이면 **payload**(메시지 안의 실제 데이터)의 \`pos\` 값을 꺼내 \`setRobotPosition\`을 호출하는 다른 경로를 가지고 있었습니다. 이 경로에서는 \`setMqttRobotPosition\`처럼 직전 좌표와 같은지 비교하지 않았습니다.`,

  `\`InteractiveMapCanvasView\`는 대략 **prop으로 받은 위치**(바깥에서 직접 넘겨받은 위치 값)인 \`robotPosition\` ?? 모니터링 모드의 **store \`robotPosition\`**(전역 상태에 저장된 위치 값) 순서로 값을 고릅니다. 그래서 prop이 없는 TEMI 경로에서는 store의 \`robotPosition\`(전역 상태에 저장된 위치 값)이 맵에 사용될 수 있고, MapViewer처럼 **prop으로 받은 위치**(바깥에서 직접 넘겨받은 위치 값)를 넘기는 경로에서는 \`mqttRobotPosition\`이 우선됩니다.`,

  `이처럼 위치를 반영하는 경로가 두 가지였기 때문에, 이후에는 두 경로 모두 동일한 **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기)와 **정규화**(형식을 하나로 맞추기) 규칙을 사용하도록 맞출 여지가 있었습니다.`,

  `### 3-5. 캔버스 훅 — \`(x, y)\`가 같으면 마커를 이동하지 않았습니다`,

  `state 단계에서 동일 위치를 걸렀더라도, 캔버스 훅에서 한 번 더 마지막 렌더 좌표와 비교했습니다. 렌더러 입장에서는 실제 마커 위치가 바뀌었는지가 중요하기 때문입니다.`,

  `\`\`\`ts
function hasPositionChanged(
  current: { x: number; y: number },
  previous: { x: number; y: number } | null
): boolean {
  if (!previous) return true;
  return current.x !== previous.x || current.y !== previous.y;
}

const currentPos = {
  x: robotPosition.x,
  y: robotPosition.y,
};

if (!hasPositionChanged(currentPos, lastRenderedPositionRef.current)) {
  return;
}

lastRenderedPositionRef.current = currentPos;

const canvasPos = toCanvasCoordinates(robotPosition, mapInfo, meta);
updateRobotMarker(canvas, canvasPos.x, canvasPos.y);
\`\`\``,

  `현재 마커는 방향성을 가진 아이콘이 아니라 원 형태였기 때문에, \`(x, y)\`가 같다면 \`yaw\`만 달라져도 화면상 차이가 크지 않았습니다. 그래서 **캔버스 마커 업데이트 스킵**(위치가 같으면 마커를 다시 움직이지 않기) 판단 기준은 \`x\`, \`y\`로 두었습니다. 다만 이후 방향을 표현하는 마커로 바뀐다면 \`yaw\`도 렌더 조건에 포함해야 합니다.`,

  `마커 깜빡임은 별도의 interval에서 \`opacity\`를 바꾸며 \`canvas.requestRenderAll()\`을 호출하고 있었습니다. 따라서 이 최적화는 위치 변경으로 인한 마커 업데이트를 줄인 것이고, 애니메이션 렌더링 비용까지 완전히 제거한 것은 아닙니다. 깜빡임을 CSS나 다른 방식으로 옮기면 이 부분도 추가로 개선할 수 있습니다.`,

  `### 3-6. \`MonitoringInfoPanel\` — 같은 위치 값을 공유했습니다`,

  `맵 옆 패널에서 \`x\`, \`y\` 값을 보여줄 때도 캔버스에 전달되는 \`robotPosition\`과 같은 기준을 사용하도록 맞췄습니다. 이렇게 하면 지도 위 마커와 숫자 패널이 서로 다른 위치를 보여주는 혼란을 줄일 수 있습니다.`,

  `---`,

  `## 4) 한눈에 정리하기`,

  `| 하려던 일 | 당시 코드에서의 모습 |
|------------|----------------------|
| 수신 / 반영 / 렌더링 분리 | MQTT는 \`messages\`에 저장하고, MapViewer는 1초마다 마지막 메시지를 확인하며, \`useRobotPositionRenderer\`가 캔버스에 마커를 표시함 |
| **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기) | **message envelope**(메시지를 저장할 때 만든 객체)에 붙인 수신 시각 + \`lastProcessedTimestampRef\` |
| 숫자가 같으면 state 갱신 생략 | \`setMqttRobotPosition\`에서 \`x, y, yaw\`가 같으면 \`prev\` 반환 |
| **캔버스 마커 업데이트 스킵**(위치가 같으면 마커를 다시 움직이지 않기) | \`hasPositionChanged\` + \`lastRenderedPositionRef\` |
| 위치 모델 **정규화**(형식을 하나로 맞추기) | \`RobotPosition\` |
| **pose 전용 짧은 큐**(pose 메시지만 따로 최신값으로 관리하는 구조) | 없음 — 전체 \`messages\` 배열에 저장한 뒤 토픽으로 필터링하고 1초마다 최신값 확인 |`,

  `---`,

  `## 5) 마치며`,

  `실시간 위치 데이터는 수신 빈도 그대로 렌더링할 필요가 없었습니다. MQTT 메시지는 수신 단계에서 저장하고, 화면에서는 현재 토픽의 최신 위치만 선별했습니다. 이후 **payload**(메시지 안의 실제 데이터)를 \`RobotPosition\`으로 **정규화**(형식을 하나로 맞추기)하고, **수신 시각 기반 중복 제거**(이미 처리한 메시지는 건너뛰기), 동일 좌표 state 스킵, **캔버스 마커 업데이트 스킵**(위치가 같으면 마커를 다시 움직이지 않기)을 단계적으로 적용해 불필요한 상태 갱신과 위치 렌더링을 줄일 수 있었습니다.`,

  `다만 현재 구조에서는 pose 메시지도 전체 \`messages\` 배열에 계속 누적될 수 있고, 마커 깜빡임 애니메이션은 주기적으로 \`requestRenderAll()\`을 호출합니다. 따라서 다음 단계에서는 **pose 전용 짧은 큐**(pose 메시지만 따로 최신값으로 관리하는 구조)와 깜빡임 렌더링 방식까지 함께 개선할 수 있습니다.`,
].join("\n\n");
