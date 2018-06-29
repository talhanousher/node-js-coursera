// exports.parameter = (x, y) => {
//   return 2 * (x + y);
// };

// exports.area = (x, y) => {
//   return x * y;
// };


module.exports = (x, y, callback) => {
  if (x > 0 && y > 0) {
    setTimeout(() => {
      callback(null, {
        parameter: () => {
          return 2 * (x + y);
        },
        area: () => {
          return x * y;
        }
      });
    }, 2000);
  } else {
    setTimeout(() => {
      callback(new Error("Length and Breadth Must be Positive"));
    }, 2000);
  }
}