import React from 'react'


class StylingUI extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      picker: {
        x: 0,
        y: 0,
      },
      gradientLight: {
        x: 0,
        y: 0,
        h: 0,
        s: 0,
        l: 0,
      }
    }
    this.pickerCursor = React.createRef()
    this.colorPicker = React.createRef()

    this.gradientLight = React.createRef()
    this.gradientLight_cursor = React.createRef()

    this.getColor = this.getColor.bind(this)
    this.getGradientLight = this.getGradientLight.bind(this)
  }

  getColor (e) {
    const { width: cursorWidth, height: cursorHeight } = this.pickerCursor.current.getBoundingClientRect()
    const { left, top, width, height } = this.colorPicker.current.getBoundingClientRect()
    const x = Math.min(width, Math.max(0, e.x - left)) - (cursorWidth / 2)
    const y = Math.min(height, Math.max(0, e.y - top)) - (cursorHeight / 2)
    this.setState({
      picker: { x, y }
    })
    const color = {
      h: Math.floor(x / width * 350),
      s: 1,
      l: y / height,
    }
    this.props.updateColor(color)
  }

  getGradientLight (e) {
    const { width: cursorWidth, height: cursorHeight } = this.gradientLight_cursor.current.getBoundingClientRect()
    const { left, top, width, height } = this.gradientLight.current.getBoundingClientRect()
    const x = Math.min(width, Math.max(0, e.x - left)) - (cursorWidth / 2)
    const y = Math.min(height, Math.max(0, e.y - top)) - (cursorHeight / 2)
    this.setState({
      gradientLight: { x, y }
    })
    const color = {
      h: Math.floor(x / width * 350),
      s: 1,
      l: y / height,
    }
    this.props.updateBackground({ to: color })
  }

  componentDidMount () {
    this.colorPicker.current.addEventListener('mousedown', () => {
      this.colorPicker.current.addEventListener('mousemove', this.getColor)
    })
    this.gradientLight.current.addEventListener('mousedown', () => {
      this.gradientLight.current.addEventListener('mousemove', this.getGradientLight)
    })

    window.addEventListener('mouseup', () => {
      this.colorPicker.current.removeEventListener('mousemove', this.getColor)
      this.gradientLight_cursor.current.removeEventListener('mousemove', this.getGradientLight)
    })

  }

  render () {
    return <div className="ui__wrapper">

        <h2>User preferences</h2>

        <div className="ui__controls">

          <div className="ui__item">
            <input id="show-tick" name="show-tick" type="checkbox" />
            <label htmlFor="show-tick">Show ticks</label>
          </div>

          <div className="ui__item">
            <label htmlFor="">Background colour</label>
            <div className="ui__colorPicker" ref={ this.gradientLight }>
              <span
                className="ui__picker__cursor"
                ref={ this.gradientLight_cursor }
                style={{
                  transform: `translate(${this.state.gradientLight.x}px, ${this.state.gradientLight.y}px)`
                }}
              ></span>
            </div>
          </div>

          <div className="ui__item">
            <label htmlFor="">Clock colour</label>
            <div className="ui__colorPicker" ref={ this.colorPicker }>
              <span
                className="ui__picker__cursor"
                ref={ this.pickerCursor }
                style={{
                  transform: `translate(${this.state.picker.x}px, ${this.state.picker.y}px)`
                }}
              ></span>
            </div>
          </div>

        </div>


      <style jsx>{`

        .ui__wrapper {
          position: relative;
          display: black;
          width: 100%;
          background: hsla(0, 0, 100%, 0.4);
          outline: solid 2px lime;
          color: white;
        }

        .ui__controls {
          display: flex;
        }

        .ui__item {
          outline: solid 1px pink;
          flex: 1 1 auto;
          position: relative;
          display: inline-block;
          padding: 16px;
          text-align: left;
        }

        .ui__wrapper label {
          display: block;
          text-align: left;
          margin-bottom: 12px;
        }
        .ui__wrapper input + label {
          display: inline-block;
        }
        .ui__colorPicker {
          position: relative;
          width: 100%;
          height: 150px;
          background-image:
            linear-gradient(hsla(0, 100%, 0%, 1), hsla(0, 100%, 100%, 0), hsla(0, 100%, 100%, 100%)),
            linear-gradient(90deg, hsl(0, 100%, 50%), hsl(50, 100%, 50%), hsl(100, 100%, 50%), hsl(150, 100%, 50%), hsl(200, 100%, 50%), hsl(250, 100%, 50%), hsl(300, 100%, 50%), hsl(350, 100%, 50%))
        }

        .ui__picker__cursor {
          position: absolute;
          top: 0;
          left: 0;
          width: 15px;
          height: 15px;
          border: solid 1px black;
          background: white;
          border-radius: 20px;
          padding: 0;
          z-index: 100
        }
      
      `}</style>
    </div>
  }
}

export default StylingUI
