import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Home: NextPage = () => {
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    
  }, [])

  const sendData = () => {
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
