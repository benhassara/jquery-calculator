exports.divide = function(a, b){return divide(a, b);};
exports.mult = function(a, b){return mult(a, b);};
exports.sub = function(a, b){return sub(a, b);};
exports.add = function(a, b){return add(a, b);};
exports.calc = function(arr){return calc(arr);};
exports.chunk = function(arr){return chunk(arr);};
exports.calcExt = function(arr){return calcExt(arr);};

var ops = ['-', '+', '\u00F7', 'x', '='];

// $(function(){

//   var input = [];

//   $('span').on('click', function(e){

//     var $el = $(this);
//     var $screen = $('#screen');

//     // if =, calc(cache, screentext)
//     if ($el.text() === '=') {
//       //evaluate
//       input.push($screen.text());
//       var res = calc(input);
//       $screen.text(res);
//       input = [];
//     }
//     else if ($el.text() === 'C') {
//       //clear
//       input = [];
//       $screen.text("");

//     }
//     else if (ops.indexOf($el.text()) === -1) {
//       //if not an operator, add to screen
//       $screen.text($screen.text() + $el.text());
//     }
//     else {
//       //must be an operator
//       input.push($screen.text());
//       input.push($el.text());
//       $screen.text("");
//     }
//   });

// });

function calcExt(inArr) {
  //eval multiple expressions
  var exprs = inArr.slice(0);
  var exprString = exprs.join('');

  while (exprs.indexOf('x') !== -1 || exprs.indexOf('\u00F7') !== -1) {
    var check = [exprs.indexOf('x'), exprs.indexOf('u00F7')];

    if (check[0] < check[1] || check[1] === -1) {
      exprs[check[0]-1] = mult(parseInt(exprs[check[0]-1]), parseInt(exprs[check[0]+1]));
      exprs.splice(check[0], 2);
    }
    else {
      exprs[check[0]-1] = divide(parseInt(exprs[check[0]-1]), parseInt(exprs[check[0]+1]));
      exprs.splice(check[0], 2);
    }
  }

  console.log(exprs);

  while (exprs.length >= 3) {
    exprs[0] = calc(exprs.slice(0, 3));
    exprs.splice(1, 2);
  }

  console.log(exprs);
}

function removeSub(inArr) {
  var eq = inArr.slice(0);
  var out = [];

  for (var i = 0; i < eq.length; i++) {
    if (eq[i] === '-') {
      out.push('+');
      out.push('-1');
      out.push('x');
    }
    else
      out.push(eq[i]);
  }
  return out;
}

function calc(inArr) {
  //choose math func by operator
  var a = parseInt(inArr[0]);
  var b = parseInt(inArr[2]);

  switch(inArr[1]) {
    case '-':
      return sub(a, b);
    case '+':
      return add(a, b);
    case 'x':
      return mult(a, b);
    case '\u00F7':
      return divide(a, b);
  }

}

function add(a, b){
  return a + b;
}

function sub(a, b){
  return a - b;
}

function mult(a, b){
  return a * b;
}

function divide(a, b){
  if (b !== 0)
    return a / b;
  else
    return 'NOPE';
}

