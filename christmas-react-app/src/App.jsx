import { useState } from 'react'
import ChristmasScene from './components/ChristmasScene'
import UIControls from './components/UIControls'
import Copyright from './components/Copyright'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    console.log('START button clicked!')
    setIsStarted(true)
  }

  console.log('App render - isStarted:', isStarted)

  return (
    <div className="app">
      {isStarted ? (
        <ChristmasScene />
      ) : (
        <UIControls onStart={handleStart} />
      )}
      <Copyright />
    </div>
  )
}

export default App
