// debugger;
import {init_comlib} from './extension-communication-api'
console.log('[content.js]. init')

const comlib = init_comlib('content', 1)

comlib.content2web.on('w2c', msg => {
  comlib.content2bg.send('c2b', msg)
})


comlib.bg2content.on(data => {
  comlib.content2web.send('c2w', data)
})