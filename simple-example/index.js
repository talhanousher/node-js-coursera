// var rectangle = {
//   parameter: (x, y) => {
//     return 2 * (x + y);
//   },
//   area: (x, y) => {
//     return x * y;
//   },
// };

var rectangle = require('./rectangle');
function solveRectangle(length, breadth) {
  // if (length > 0 && breadth > 0) {
  //   console.log (
  //     'Parameter is ' + rectangle.parameter (length, breadth) + ' unit'
  //   );
  //   console.log ('Area is ' + rectangle.area (length, breadth) + ' unit');
  // } else {
  //   console.log ('Length and Breadth must be positive');
  // }
  rectangle(length, breadth, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Area : ' + res.area());
      console.log('Parameter : ' + res.parameter());
    }
  });
}
console.log("saasdasd")

solveRectangle(4, 3);
solveRectangle(4, -3);
solveRectangle(-4, -3);
solveRectangle(-4, 3);

