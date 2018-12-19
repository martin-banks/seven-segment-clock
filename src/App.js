import React, { Component } from 'react'
import './App.css'

import Digit from './components/digit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 0,
      dateNow: 0,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    this.counter = this.counter.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  updateDate () {
    const d = new Date()
    this.setState({
      dateNow: Date.now(),
      time: {
        hours: d.getHours(),
        minutes: `0${d.getMinutes()}`.slice(-2),
        seconds: `0${d.getSeconds()}`.slice(-2),
      }
    })
  }

  counter () {
    this.setState({
      number: this.state.number === 9 ? 0 : this.state.number + 1,
    })
    this.updateDate()
  }

  componentWillMount () {
    this.updateDate()
  }

  componentDidMount () {
    setInterval(this.counter, 1000)
  }

  render () {
    return (
      <div className="App">
        <div className="clock">
          {
            `${this.state.time.hours}`
              .split('')
              .map((n, i) => <Digit key={ `digit-${i}` } number={ parseInt(n, 10) } />)
          }
          <span className={ parseInt(this.state.time.seconds, 10) % 2 ? 'show' : 'hide' }>:</span>
          {
            `${this.state.time.minutes}`
              .split('')
              .map((n, i) => <Digit key={ `digit-${i}` } number={ parseInt(n, 10) } />)
          }
          <span className={ parseInt(this.state.time.seconds, 10) % 2 ? 'show' : 'hide' }>:</span>
          {
            `${this.state.time.seconds}`
              .split('')
              .map((n, i) => <Digit key={ `digit-${i}` } number={ parseInt(n, 10) } />)
          }
        </div>

        <style jsx>{`
          .App {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
            background: #222;
          }

          span {
            transition: opacity 200ms;
            position: relative;
            display: inline-block;
            color: white;
            font-size: 60px;
            line-height: 100px;
            height: 100px;
            padding: 20px
          }
          .show {
            opacity: 1;
          }
          .hide {
            opacity: 0;
          }

        `}</style>
      </div>
    )
  }
}

export default App
