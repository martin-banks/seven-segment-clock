import React, { Component } from 'react'
import './App.css'

import Digit from './components/digit'
import StylingUI from './components/styling-ui'

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
      },
      color: {
        h: 0,
        s: 1,
        l: 0.5,
      },
      background: {
        from: { h: 210, s: 0, l: 0 },
        to: { h: 210, s: 1, l: 0.1 },
      },
      showUI: true,
      tick: false,
    }
    this.counter = this.counter.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateColor = this.updateColor.bind(this)
    this.updateBackground = this.updateBackground.bind(this)
    this.toggleUI = this.toggleUI.bind(this)
    this.toggleTick = this.toggleTick.bind(this)
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

  updateColor ({ h, s, l }) {
    this.setState({
      color: { h, s, l }
    })
  }

  updateBackground ({ from, to }) {
    console.log({ from, to })
    let updateFrom = this.state.background.from
    let updateTo = this.state.background.to
    if (from) updateFrom = from
    if (to) updateTo = to
    this.setState({
      background: {
        to: updateTo,
        from: updateFrom,
      }
    })
  }

  toggleUI () {
    this.setState({ showUI: !this.state.showUI })
  }

  toggleTick (e) {
    this.setState({ tick: e.target.checked })
  }

  componentWillMount () {
    this.updateDate()
  }

  componentDidMount () {
    setInterval(this.counter, 1000)
  }

  render () {
    return (
      <div className="App" style={{
        background: `linear-gradient(
        hsl(
          ${this.state.background.from.h},
          ${this.state.background.from.s * 100}%,
          ${this.state.background.from.l * 100}%
        ),
        hsl(
          ${this.state.background.to.h},
          ${this.state.background.to.s * 100}%,
          ${this.state.background.to.l * 100}%
        )` }}>
        <div className="content">
        
          <div className="clock">
            {
              Object.keys(this.state.time)
                .map((k, timeIndex) => <>
                  {
                    timeIndex !== 0 && <span
                      key={ `tick-${timeIndex}` }
                      className={
                        this.state.tick && 'flash'
                      }
                    >:</span>
                  }
                  {
                    `${this.state.time[k]}`
                      .split('')
                      .map((n, i) => <>
                          <Digit
                            key={ `digit-${i}` }
                            number={ parseInt(n, 10) }
                            color={ `hsl(${[
                              this.state.color.h,
                              `${this.state.color.s * 100}%`,
                              `${this.state.color.l * 100}%`,
                            ].join()}` }
                          />
                        </>
                      )
                  }
                </>)
            }
          </div>
          <button
            className="toggleControls"
            onClick={ this.toggleUI }
          >
            {` ${this.state.showUI ? 'Hide' : 'Show' } controls` }
          </button>
          {
            this.state.showUI && <StylingUI
              updateColor={ this.updateColor }
              updateBackground={ this.updateBackground }
              toggleTick={ this.toggleTick }
            />
          }
        </div>


        <style jsx>{`
          .App {
            min-width: 100vw;
            min-height: 100vh;
          }
          .content {
            width: 80%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .clock {
            display: flex;
            align-items: center;
            justify-content: center;
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

          @keyframes flashTick {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .flash {
            animation: flashTick 1s infinite linear;
          }

          button.toggleControls {
            transition: opacity 300ms;
            background: none;
            padding: 10px 30px;
            border-radius: 100px;
            border: solid 1px white;
            color: white;
            font-size: 16px;
            opacity: 0.6;
            cursor: pointer
          }
          button.toggleControls:hover {
            opacity: 1;
          }

        `}</style>
      </div>
    )
  }
}

export default App
