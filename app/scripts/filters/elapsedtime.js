MemorizeMaster.filter('elapsedTime', function() {
  var formatNumber = function(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number.toString();
    }
  }

  return function(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;

    return formatNumber(minutes) + ":" + formatNumber(seconds);
  }
});
