'use strict';

MemoryMaster.factory('Card', ['ImageList', function(ImageList) {
  var PATTERNS = ['stairs', 'microbial', 'horizontal-stripes', 'rombes', 'arrows', 
                  'zig-zag', 'weave', 'upholstery', 'stary', 'marrakesh', 'bokeh', 
                  'carbon', 'vertical-stripes', 'carbon-fibre', 'hearts', 'argyle', 
                  'steps', 'waves', 'cross', 'yin-yang', 'stars', 'brady-bunch', 'shippo', 
                  'bricks', 'seigaiha', 'japanese-cube', 'polka-dot', 'houndstooth', 
                  'checkerboard', 'diagonal-checkerboard', 'tartan', 'madras', 'lined-paper', 
                  'blueprint-grid', 'tablecloth', 'diagonal-stripes', 'cicada-stripes'];

  var cardPattern = function(stage) {
    var index = stage % PATTERNS.length - 1;

    if (index < 0) {
      return PATTERNS[PATTERNS.length - 1];
    } else {
      return PATTERNS[index];
    }
  }

  var Card = function(icon) {
    this.isShowing = false;
    this.wasSeen = false;
    this.image = icon.image;
    this.color = icon.color;
  };

  Card.newSet = function(stage, numberOfCards) {
    var imageList = new ImageList(numberOfCards);
    var pattern = cardPattern(stage);

    return _.map(imageList.images, function(image) {
      var card = new Card(image);
      card.pattern = pattern;
      return card;
    });
  }

  return Card;
}]);
