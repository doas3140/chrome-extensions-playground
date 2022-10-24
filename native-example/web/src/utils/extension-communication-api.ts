export function init_comlib(ID: 'web' | 'content' | 'bg' | 'native', LOG: 0 | 1, NATIVE_APP: string | undefined = undefined) {
  return {
    content2web: {
      send: (type: string, message: any) => {
        if (LOG > 0) console.log(`[content2web] ${ID} sends`, message)
        const to = ID == 'content' ? 'web' : 'content'
        window.postMessage({from: ID, to, type, message}, '*') // TODO: can we specify where to send message here and not msg itself?
      },
      on: (type: string, func: (data: any) => void) => {
        const from = ID == 'content' ? 'web' : 'content'
        return window.addEventListener(
          'message',
          event => {
            // We only accept messages from ourselves
            if (event.source != window) {
              return
            }
            if (event.data.to && event.data.to == ID) {
              // if (event.data.from && event.data.from == from) {
              if (event.data.type && event.data.type == type) {
                delete event.data.to
                delete event.data.from
                if (LOG > 0)
                  console.log(`[content2web] ${from} -> ${ID} received`, event.data)
                func(event.data)
              }
              // }
            }
          },
          false,
        )
      },
    },
    content2bg: {
      send: (type: string, message: any): Promise<any> =>
        new Promise((res, rej) => {
          if (LOG > 0) console.log(`[content2bg] ${ID} sends`, message)
          const to = ID == 'content' ? 'bg' : 'content'
          chrome.runtime.sendMessage({type, message}, response => {
            console.log(`[content2bg] ${ID} received`, response)
            res(response)
          })
        }),
      on: (type: string, func: (data: any) => void) => {
        const from = ID == 'content' ? 'bg' : 'content'

        return chrome.runtime.onMessage.addListener((msg, ID, sendResponse) => {
          console.log(`[content2bg] ${from} -> ${ID} received`, msg)
          const response = func(msg)
          sendResponse(response)
        })
      },
    },
    bg2native: {
      send: (message: any): Promise<any> =>
        new Promise((res, rej) => {
          if (!NATIVE_APP) return rej(`you need to specift NATIVE_APP!`)
          if (LOG > 0) console.log(`[bg2native] ${ID} sent`, message)
          const to = ID == 'native' ? 'bg' : 'native'
          chrome.runtime.sendNativeMessage(NATIVE_APP, message, response => {
            console.log(`[bg2native] ${ID} received`, response)
            res(response)
          })
        }),
      // no need ?
      // on: (type: string, func: (data: any) => void) => {
      //   const from = ID == 'native' ? 'bg' : 'native'
      //   return chrome.runtime.onMessage.addListener((msg, ID, sendResponse) => {
      //     console.log(`[bg2native] ${from} -> ${ID} received`, msg)
      //     const response = func(msg)
      //     sendResponse(response)
      //   })
      // },
    },
  }
}
