import React from 'react'


class StylingUI extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      picker: {
        x: 0,
        y: 0,
      }
    }
    this.pickerCursor = React.createRef()
    this.colorPicker = React.createRef()
  }

  componentDidMount () {
    window.addEventListener('mousemove', e => {
      const { width: cursorWidth, height: cursorHeight } = this.pickerCursor.current.getBoundingClientRect()
      console.log(this.colorPicker)
      const { left, top, width, height } = this.colorPicker.current.getBoundingClientRect()
      this.setState({
        picker: {
          x: Math.min(width, Math.max(0, e.x - left)) - (cursorWidth / 2),
          y: Math.min(height, Math.max(0, e.y - top)) - (cursorHeight / 2),
        }
      })
    })

  }

  render () {
    return <div>

      <div className="wrapper">
        <h2>User preferences</h2>

        <label htmlFor="show-tick">Show ticks</label>
        <input id="show-tick" name="show-tick" type="checkbox" />

        <label htmlFor="">Background colour</label>
        {/*
          hsl color picker
          h = x axis
          s = 50
          l = y axis
        */}
        <div className="colorPicker" ref={ this.colorPicker }>
          <span
            className="picker__cursor"
            ref={ this.pickerCursor }
            style={{
              transform: `translate(${this.state.picker.x}px, ${this.state.picker.y}px)`
            }}
          ></span>
        </div>

        <label htmlFor="">Clock colour</label>

      </div>


      <style jsx>{`

        .colorPicker {
          position: relative;
          width: 300px;
          height: 150px;
          background-image:
            linear-gradient(hsla(0, 100%, 100%, 0), hsla(0, 100%, 100%, 100%)),
            linear-gradient(90deg, hsl(0, 100%, 50%), hsl(50, 100%, 50%), hsl(100, 100%, 50%), hsl(150, 100%, 50%), hsl(200, 100%, 50%), hsl(250, 100%, 50%), hsl(300, 100%, 50%), hsl(350, 100%, 50%))
        }

        .picker__cursor {
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
