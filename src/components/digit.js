import React from 'react'

import Segment from './segment'

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
      <div>
        <div className="wrapper">
          {/* <div className="segment segment__a">a</div>
          <div className="segment segment__b">b</div>
          <div className="segment segment__c">c</div>
          <div className="segment segment__d">d</div>
          <div className="segment segment__e">e</div>
          <div className="segment segment__f">f</div>
          <div className="segment segment__g">g</div> */}

          {
            patterns[this.props.number]
              .map((p, i) => <div
                  className={ `segment segment__${i}` }
                  key={`segment-${i}`}
                  style={{ background: p ? 'red' : '#555' }}
                ></div>
              )
          }
        </div>
      </div>


      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .wrapper {
          position: relative;
          display: block;
          width: 100px;
          height: 200px;
          background: #333;
          padding: 12px;
        }

        .segment {
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 10px;
          height: 60px;
          background: #666;
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
