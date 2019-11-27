import React, { useState } from 'react'
import Routes from './Routes'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  return (
    <div>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  )
}

export default App
