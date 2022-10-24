// debugger;
import {init_comlib} from './extension-communication-api'
console.log('[content.js]. init')

const comlib = init_comlib('content', 1)

comlib.content2web.on('TEST_MSG', async data => {
  const res = await comlib.content2bg.send('TEST_MSG', data)
  comlib.content2web.send('TEST_MSG_RES', res)
})
