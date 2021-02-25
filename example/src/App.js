import React, { useEffect } from 'react'

import { PopUp } from 'sics'
import 'sics/dist/index.css'

const App = () => {
  useEffect(() => {
    PopUp.instance.setContent(
      <>
        <div>Hello</div>
        <div>Salut</div>
      </>
    )
  }, [])

  return <PopUp />
}

export default App
