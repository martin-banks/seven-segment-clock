# # SEVEN SEGMENT DISPLAY

Display the current time using a seven segment display


### What is a seven segment display?
It's a digital screen display system where each character consisits of seven segments (like what you will have seen on calculators)


### How do you make it
When creating this display, the order of the segments is important. Startign with the top left and working clockwise with the last segment being the central spar. 

| - | B | - |
| A | - | C |
| - | G | - |
| F | - | D |
| - | E | - |

With this established pattern, we can assign each segment an on/off status for each number, I used a two-dimentional array:

``` javascript
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
```

The component is caled and passed a number prop, this prop is used to retrieve the appropriate pattern from the array above and style each segment accordingly. This component is then used multiple times to build up the clock display

 
#### The clock
Using the native JavaScript date function we can extract the values we want to use in our clock:

```javascript
const d = new Date()
const time: {
	hours: d.getHours(),
	minutes: `0${d.getMinutes()}`.slice(-2),
	seconds: `0${d.getSeconds()}`.slice(-2),
}
```

Note for the minutes and seconds I convert to string, prefix with zero and call `slice(-2)`  this ensures that I always get a two-digit number displaying in the clock (and prevents number jumping around.

Each of these values are iterated over to create new digits with number props, thus display the current time,

A `setInterval` loop is then created to updated these time values every second


## Evolution
[ ] Use requestAnimationFrame for improved performance
[ ] UI for user to controlled style options - use local storage to remember preferences
[x] Flash the dot separators
[ ] Countdown option
[ ] Stopwatch option










