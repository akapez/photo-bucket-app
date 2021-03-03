import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Posts from './screens/Posts'

function App() {
  return (
    <>
      <Header />
      <main>
        <Posts />
      </main>
      <Footer />
    </>
  )
}

export default App
