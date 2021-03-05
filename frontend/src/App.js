import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Posts from './screens/Posts'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={Posts} exact/>
      </main>
      <Footer />
    </Router>
  )
}

export default App
