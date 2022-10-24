import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { eapi } from 'utils/extension'


var start = new Date()
start
const Home: NextPage = () => {
  const [data, setData] = React.useState({})
  const [time, setTime] = React.useState(0)

  React.useEffect(() => {
    eapi.content2web.on('c2w', msg => {
      const end = new Date()
      const delta = Math.abs(end.getTime()-start.getTime())
      setTime(delta)
      setData(msg)
    })
  }, [])

  const data_to_send = {data: 'ping'}

  const sendData = () => {
    start = new Date()
    eapi.content2web.send('w2c', data_to_send);
  }

  return (
    <div style={{margin: 100}}>
      <div>
        <div>send data: {JSON.stringify(data_to_send)}</div>
        <button onClick={sendData}>send</button>
      </div>
      <div>
        <div>received data</div>
        {JSON.stringify(data)}
      </div>
      <div>
        <div>took</div>
        {time}
      </div>
        
    </div>
  )
}

export default Home
