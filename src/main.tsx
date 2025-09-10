import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import SignupForm from './components/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="login" element={<SignupForm/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
