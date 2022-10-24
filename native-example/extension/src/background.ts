import { init_comlib } from "./extension-communication-api";
console.log('[background] init')

const NATIVE_APP = 'pingpong'
const comlib = init_comlib('bg', 1, NATIVE_APP)

// comlib.content2bg.on('TEST_MSG', (data) => {
//   return {
//     from_bg: 'hello world!'
//   }
// })


setInterval(async () => {
  const res = await comlib.bg2native.send({text: "ping"})
}, 1000)