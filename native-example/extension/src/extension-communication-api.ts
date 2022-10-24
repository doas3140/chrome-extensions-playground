export function init_comlib(ID: 'web' | 'content' | 'bg' | 'native', LOG: 0 | 1, NATIVE_APP: string | undefined = undefined) {
  return {
    content2web: {
      send: (type: string, message: any) => {
        if (LOG > 0) console.log(`[content2web] ${ID} sends`, message)
        const to = ID == 'content' ? 'web' : 'content'
        window.postMessage({from: ID, to, type, message}, '*') // TODO: can we specify where to send message here and not msg itself?
      },
      on: (type: string, func: (msg: any, other_data: any) => void) => {
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
                func(event.data.message, event.data)
              }
              // }
            }
          },
          false,
        )
      },
    },
    content2bg: {
      // can't use await in here :( or we get Unchecked runtime.lastError: The message port closed before a response was received.
      send: (type: string, message: any): Promise<any> =>
        new Promise((res, rej) => {
          if (LOG > 0) console.log(`[content2bg] ${ID} sends`, message)
          const to = ID == 'content' ? 'bg' : 'content'
          chrome.runtime.sendMessage(message, response => {
            res(response)
          })
        }),
      on: (func: (data: any) => void) => {
        const from = ID == 'content' ? 'bg' : 'content'

        return chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
          console.log(`[content2bg] ${from} -> ${ID} received`, msg)
          const response = func(msg)
          sendResponse(response)
        })
      },
    },
    bg2content: {
      send: (message: any) => {
        if (LOG > 0) console.log(`[bg2content] ${ID} sends`, message)
        const query = {active: true, currentWindow: true} // TODO: can use {} and then filter tabs by url
        chrome.tabs.query(query, function(tabs){
          for (const tab of tabs) {
            if (!tab?.id) {
              console.log('ERROR: no tab.id found')
              return false
            }
            chrome.tabs.sendMessage(tab.id, message)
          }
        })
      },
      on: (func: (data: any) => void) => {
        chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
          const from = ID == 'content' ? 'bg' : 'content'
          console.log(`[bg2content] ${from} -> ${ID} received`, msg)
          const response = func(msg)
          sendResponse(response);
       })
      }
    },
    bg2native: {
      send: (message: any): Promise<any> =>
        new Promise((res, rej) => {
          if (!NATIVE_APP) return rej(`you need to specify NATIVE_APP!`)
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
