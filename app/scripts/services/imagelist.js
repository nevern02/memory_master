MemorizeMaster.factory("ImageList", function() {
  var images = [
    "fa-adjust",
    "fa-anchor",
    "fa-archive",
    "fa-arrows",
    "fa-arrows-h",
    "fa-arrows-v",
    "fa-asterisk",
    "fa-automobile",
    "fa-ban",
    "fa-bank",
    "fa-bar-chart-o",
    "fa-barcode",
    "fa-bars",
    "fa-beer",
    "fa-bell",
    "fa-bell-o",
    "fa-bolt",
    "fa-bomb",
    "fa-book",
    "fa-bookmark",
    "fa-bookmark-o"
  ];
  
  var ImageList = function(numberOfCards) {
    this.images = _.clone(images).slice(0, numberOfCards);
  };

  return ImageList;
});
