
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './Components/scrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <ScrollToTop/> */}
    <App />
  </BrowserRouter>

)
