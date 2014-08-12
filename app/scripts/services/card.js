MemorizeMaster.factory("Card", [function() {
  var Card = function(image) {
    this.isShowing = false;
    this.image = image;
  };

  return Card;
}]);
