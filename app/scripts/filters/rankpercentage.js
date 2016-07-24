MemoryMaster.filter('rankPercentage', function() {
  return function(percentage) {
    var position = null;
    var number   = (percentage * 100).toFixed(0);

    number = number == 0 ? 1 : number;

    if (percentage <= 0.5) {
      position = 'Top'
    } else {
      position = 'Bottom'
      number   = 100 - number;
    }

    return position + ' ' + number + '%';
  }
});
