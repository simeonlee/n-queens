/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function (row, n, board, validator, callback) {

  // If we reach the end successfully, push the solution to solutions array
  if (row === n) {
    return callback();
  }

  // Iterate over columns in the selected row
  for ( var j = 0; j < n; j++ ) {

    // Create a variant of the board with placement of piece at new col
    // 'Row' variable is set at function invocation
    board.togglePiece(row, j);

    if ( !board[validator]() ) {

      // If no conflict, call the function again to build upon that board
      var result = findSolution(row + 1, n, board, validator, callback);
      if ( result ) {
        return result;
      }
    }

    // Reset back to 0 so that the next iteration of the loop can move piece one space over
    board.togglePiece(row, j);
  }
};


window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionsCount = 0;
  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solutionsCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionsCount);
  return solutionsCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  }) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionsCount = 0;
  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionsCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionsCount);
  return solutionsCount;
};
