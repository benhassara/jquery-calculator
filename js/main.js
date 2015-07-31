// exports.divide = function(a, b){return divide(a, b);};
// exports.mult = function(a, b){return mult(a, b);};
// exports.sub = function(a, b){return sub(a, b);};

var ops = ['-', '+', '\u00F7', 'x', '='];

$(function(){

  var input = [];

  $('span').on('click', function(e){

    var $el = $(this);
    var $screen = $('#screen');

    // if =, calc(cache, screentext)
    if ($el.text() === '=') {
      //evaluate
      input.push($screen.text());
      var res = calc(input);
      $screen.text(res);
      input = [];
    }
    else if ($el.text() === 'C') {
      //clear
      input = [];
      $screen.text("");

    }
    else if (ops.indexOf($el.text()) === -1) {
      //if not an operator, add to screen
      $screen.text($screen.text() + $el.text());
    }
    else {
      //must be an operator
      input.push($screen.text());
      input.push($el.text());
      $screen.text("");
    }
  });

});

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

