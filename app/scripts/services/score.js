'use strict';

MemorizeMaster.service('Score', function() {
  var score = 0;

  this.getScore = function() {
    return score;
  }

  this.setScore = function(newScore) {
    score = newScore;
  }
});
