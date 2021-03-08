import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Posts from './screens/Posts'
import Login from './screens/Login'
import Register from './screens/Register'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Posts} exact/>
      </main>
      <Footer />
    </Router>
  )
}

export default App
