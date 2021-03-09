import React from 'react'
import girl from '../assets/girl.png'
import classes from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Left}>
        <img alt='girl' src={girl} className={classes.Img} />
      </div>
      <div className={classes.Right}>
        <div>
          <div>
            <h1>PHOTO <span className={classes.Caption}>BUCKET</span></h1>
          </div>
          <p>
            Save your awesome memories in here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
