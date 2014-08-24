MemorizeMaster.factory("Card", [function() {
  var Card = function(image) {
    this.isShowing = false;
    this.image = image.image;
    this.color = image.color;
  };

  Card.prototype.currentColor = function() {
    if (this.isShowing) {
      return this.color;
    } else {
      return 'transparent';
    }
  }

  return Card;
}]);
