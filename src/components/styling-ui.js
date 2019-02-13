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
      },
      gradientDark: {
        x: 0,
        y: 0,
        h: 0,
        s: 0,
        l: 0,
      },
    }
    this.pickerCursor = React.createRef()
    this.colorPicker = React.createRef()

    this.gradientLight = React.createRef()
    this.gradientLight_cursor = React.createRef()

    this.gradientDark = React.createRef()
    this.gradientDark_cursor = React.createRef()

    this.getColor = this.getColor.bind(this)
    this.getGradientLight = this.getGradientLight.bind(this)
    this.getGradientDark = this.getGradientDark.bind(this)
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

  getGradientDark (e) {
    const { width: cursorWidth, height: cursorHeight } = this.gradientDark_cursor.current.getBoundingClientRect()
    const { left, top, width, height } = this.gradientDark.current.getBoundingClientRect()
    const x = Math.min(width, Math.max(0, e.x - left)) - (cursorWidth / 2)
    const y = Math.min(height, Math.max(0, e.y - top)) - (cursorHeight / 2)
    this.setState({
      gradientDark: { x, y }
    })
    const color = {
      h: Math.floor(x / width * 350),
      s: 1,
      l: y / height,
    }
    this.props.updateBackground({ from: color })
  }

  componentDidMount () {
    // ! Event handlers not handled correctly
    this.colorPicker.current.addEventListener('mousedown', () => {
      this.colorPicker.current.addEventListener('mousemove', this.getColor)
    })
    this.gradientLight.current.addEventListener('mousedown', () => {
      this.gradientLight.current.addEventListener('mousemove', this.getGradientLight)
    })
    this.gradientDark.current.addEventListener('mousedown', () => {
      this.gradientDark.current.addEventListener('mousemove', this.getGradientDark)
    })

    window.addEventListener('mouseup', () => {
      // ! Removing event lsiteners throws error
      // 💀 "Cannot read property 'removeEventListener' of null"
      this.colorPicker.current.removeEventListener('mousemove', this.getColor)
      this.gradientLight_cursor.current.removeEventListener('mousemove', this.getGradientLight)
      this.gradientDark_cursor.current.removeEventListener('mousemove', this.getGradientDark)
    })

  }

  render () {
    return <div className="ui__wrapper">

        <h2>Clock preferences</h2>

        <div className="ui__controls">

          <div className="ui__item">
            <input
              id="show-tick"
              name="show-tick"
              type="checkbox"
              onClick={ this.props.toggleTick }
            />
            <label htmlFor="show-tick">Show ticks</label>
          </div>

            <h3 >Background gradient</h3>
          <div className="ui__item">
            <div class="ui__item--wrapper">
              <p>Top</p>
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
            <div class="ui__item--wrapper">
              <p>Bottom</p>
              <div className="ui__colorPicker" ref={ this.gradientDark }>
                <span
                  className="ui__picker__cursor"
                  ref={ this.gradientDark_cursor }
                  style={{
                    transform: `translate(${this.state.gradientDark.x}px, ${this.state.gradientDark.y}px)`
                  }}
                ></span>
              </div>
            </div>
          </div>

          <h3>Clock colour</h3>
          <div className="ui__item">
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
          display: block;
          width: 100%;
          background: hsla(0, 0, 100%, 0.4);
          color: white;
        }

        .ui__controls {
          display: flex;
          flex-direction: column;
        }

        .ui__item {
          flex: 1 1 auto;
          position: relative;
          display: flex;
          padding: 16px;
          text-align: left;
        }
        .ui__item--wrapper {
          flex: 1 1 0;
          padding: 0 20px;
        }

        .ui__wrapper label {
          display: block;
          text-align: left;
          margin-bottom: 12px;
        }
        .ui__wrapper input + label {
          display: inline-block;
          width: 30%;
        }
        .ui__colorPicker {
          position: relative;
          width: 100%;
          height: 100px;
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
