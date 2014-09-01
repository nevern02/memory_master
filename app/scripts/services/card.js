MemorizeMaster.factory('Card', ['ImageList', function(ImageList) {
  var PATTERNS = ['stairs', 'microbial', 'horizontal-stripes', 'rombes', 'arrows', 
                  'zig-zag', 'weave', 'upholstery', 'stary', 'marrakesh', 'bokeh', 
                  'carbon', 'vertical-stripes', 'carbon-fibre', 'hearts', 'argyle', 
                  'steps', 'waves', 'cross', 'yin-yang', 'stars', 'brady-bunch', 'shippo', 
                  'bricks', 'seigaiha', 'japanese-cube', 'polka-dot', 'houndstooth', 
                  'checkerboard', 'diagonal-checkerboard', 'tartan', 'madras', 'lined-paper', 
                  'blueprint-grid', 'tablecloth', 'diagonal-stripes', 'cicada-stripes'];

  var cardWidth = function(stage) {
    return Math.max(9.5 - (0.5 * stage), 2) + "em";
  }

  var cardHeight = function(stage) {
    return Math.max(12.5 - (0.5 * stage), 2) + "em";
  }

  var fontSize = function(stage) {
    return Math.max(6.5 - (0.5 * stage), 1) + "em";
  }

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
    var width = cardWidth(stage);
    var height = cardHeight(stage);
    var font = fontSize(stage);
    var pattern = cardPattern(stage);

    return _.map(imageList.images, function(image) {
      var card = new Card(image);
      card.width = width;
      card.height = height;
      card.fontSize = font;
      card.pattern = pattern;
      return card;
    });
  }

  return Card;
}]);
