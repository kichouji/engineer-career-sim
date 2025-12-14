import { useState } from 'react'
import './App.css'
import { GameScreen } from './components/GameScreen'
import { TitleScreen } from './components/TitleScreen'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const startGame = () => {
    setIsPlaying(true)
  }

  return (
    <div className="app-container">
      {isPlaying ? (
        <GameScreen />
      ) : (
        <TitleScreen onStart={startGame} />
      )}
    </div>
  )
}

export default App
