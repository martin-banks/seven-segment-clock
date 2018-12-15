import React, { Component } from 'react'
import './App.css'

import Digit from './components/digit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 0,
      date: 0,
    }
    this.counter = this.counter.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  updateDate () {
    this.setState({
      date: Date.now(),
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
    // window.requestAnimationFrame(this.updateDate)
  }

  render () {
    return (
      <div className="App">
        {/* <Digit number={ this.state.number } /> */}

        {
          `${this.state.date}`.split('')
            .map((n, i) => <Digit
                key={ `digit-${i}` }
                number={ parseInt(n, 10) }
              />
            )
        }
      </div>
    )
  }
}

export default App
