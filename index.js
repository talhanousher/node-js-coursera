var rectangle = {
  parimeter: (x, y) => {
    return 2 * (x + y);
  },
  area: (x, y) => {
    return x * y;
  },
};

function solveRectangle (length, breadth) {
  if (length > 0 && breadth > 0) {
    console.log (
      'Parimeter is ' + rectangle.parimeter (length, breadth) + ' unit'
    );
    console.log ('Area is ' + rectangle.area (length, breadth) + ' unit');
  }
}

solveRectangle (4, 3);
