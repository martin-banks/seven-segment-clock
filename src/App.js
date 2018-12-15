import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Digit from './components/digit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 0,
    }
    this.counter = this.counter.bind(this)
  }

  counter () {
    this.setState({
      number: this.state.number === 9 ? 0 : this.state.number + 1,
    })
  }

  componentDidMount () {
    setInterval(this.counter, 1000)
  }

  render () {
    return (
      <div className="App">
        <Digit number={ this.state.number } />
      </div>
    )
  }
}

export default App
