import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { eapi } from 'utils/extension'

const Home: NextPage = () => {
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    eapi.content2web.on('TEST_MSG_RES', data => {
      
    })
  }, [])

  const sendData = () => {
    eapi.content2web.send('TEST_MSG', {data: 'hello world'});
  }

  return (
    <div style={{margin: 100}}>
      <div>
        <div>send</div>
        <button onClick={sendData}>send</button>
      </div>
      <div>
        <div>received data</div>
        {JSON.stringify(data)}
      </div>
        
    </div>
  )
}

export default Home
