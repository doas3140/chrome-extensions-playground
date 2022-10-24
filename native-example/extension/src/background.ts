import { init_comlib } from "./extension-communication-api";
console.log('[background] init')

const comlib = init_comlib('bg', 1)

comlib.content2bg.on('TEST_MSG', (data) => {
  return {
    from_bg: 'hello world!'
  }
})