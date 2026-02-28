/**
 * @file main.tsx
 * @author Salman Nouman
 * @date 2026-02-26
 * @description Entry point of the React application that renders the App component in StrictMode into the DOM root element.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
