import React from 'react'

const patterns = [
// A  B  C  D  E  F  G
  [1, 1, 1, 1, 1, 1, 0], // 0
  [0, 1, 1, 0, 0, 0, 0], // 1
  [1, 1, 0, 1, 1, 0, 1], // 2
  [1, 1, 1, 1, 0, 0, 1], // 3
  [0, 1, 1, 0, 0, 1, 1], // 4
  [1, 0, 1, 1, 0, 1, 1], // 5
  [1, 0, 1, 1, 1, 1, 1], // 6
  [1, 1, 1, 0, 0, 0, 0], // 7
  [1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 0, 1, 1], // 9
]

class Digit extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <>
      <div className="digit">
        <div className="wrapper">
          {
            patterns[this.props.number]
              .map((p, i) => <div
                  className={ `segment segment__${i}` }
                  key={`segment-${i}`}
                  style={{
                    opacity: p ? 0.9 : 0.05,
                    background: this.props.color,
                  }}
                ></div>
              )
          }
        </div>
      </div>


      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .digit {
          display: inline-block;
          vertical-align: top;
          margin: 0;
          padding: 0;
        }

        .wrapper {
          position: relative;
          display: inline-block;
          width: 100px;
          height: 200px;
          padding: 12px;
        }

        .segment {
          transition: opacity 250ms;
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 10px;
          height: 60px;
          background: white;
          transform-origin: 0 0;
          color: white;
          border-radius: 10px;
        }

        .segment__0 {
          transform: translate(20px, 20px) rotate(-90deg)
        }
        .segment__1 {
          transform: translate(80px, 20px) rotate(0)
        }
        .segment__2 {
          transform: translate(80px, 90px) rotate(0)
        }
        .segment__3 {
          transform: translate(20px, 160px) rotate(-90deg)
        }
        .segment__4 {
          transform: translate(10px, 90px) rotate(0)
        }
        .segment__5 {
          transform: translate(10px, 20px) rotate(0)
        }
        .segment__6 {
          transform: translate(20px, 90px) rotate(-90deg)
        }

      `}</style>
    </>
  }
}

export default Digit
