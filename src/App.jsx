import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScreenPlanning from './ScreenPlanning'
import UIArchitecture from './UIArchitecture'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenPlanning />} />
        <Route path="/ui-architecture" element={<UIArchitecture />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
