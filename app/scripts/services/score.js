'use strict';

MemorizeMaster.service('Score', ['Alert', function(Alert) {
  var score = 0;
  var multiplier = 1; 
  var stageMultiplier = 0;
  var history = [];

  var recordHistory = function(match) {
    history.unshift(match);

    if (history.length > 50) {
      history.pop();
    }
  }

  var alert = function() {
    if (multiplier > 1) {
      Alert.alert('x' + (multiplier + stageMultiplier), 'teal');
    }
  }

  this.getScore = function() {
    return score;
  }

  this.reset = function() {
    multiplier = 1;
    stageMultiplier = 0;
    score = 0;
    history = [];
  }

  this.add = function(points) {
    score = score + points * (multiplier + stageMultiplier);

    if (history[0]) {
      multiplier += 1;
      alert();
    }

    recordHistory(true);
  }

  this.getTotalMultiplier = function() {
    return multiplier + stageMultiplier;
  }

  this.resetMultiplier = function() {
    multiplier = 1;
    recordHistory(false);
  }

  this.setStageMultiplier = function(value) {
    stageMultiplier = value;
  }
}]);
