import { init_comlib } from "./extension-communication-api";
console.log('[background] init')

const NATIVE_APP = 'pingpong'
const comlib = init_comlib('bg', 1, NATIVE_APP)

comlib.content2bg.on(async (data) => {
  const res = await comlib.bg2native.send(data)
  comlib.bg2content.send(res)
})