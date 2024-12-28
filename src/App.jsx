import './App.css'
import AllRoutes from './Routes/AllRoutes'
import { Header, Footer } from './Components'
import { ScrollToTop } from './Components'

function App() {

  return (
    <>
      <div>
        <ScrollToTop />
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </>
  )
}

export default App
