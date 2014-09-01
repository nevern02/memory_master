'use strict';

MemorizeMaster.factory('ImageList', function() {
  var COLORS = ['red', 'green', 'blue', 'teal', 'orange', 'purple', 
                'brown', 'darkcyan', 'olive', 'tan', 'violet'];
  var IMAGES = ['fa-adjust', 'fa-anchor', 'fa-archive', 'fa-arrows', 'fa-arrows-h', 'fa-arrows-v',
                'fa-asterisk', 'fa-automobile', 'fa-ban', 'fa-bank', 'fa-barcode', 'fa-bars',
                'fa-beer', 'fa-bell', 'fa-bell-o', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark',
                'fa-bookmark-o', 'fa-briefcase', 'fa-bug', 'fa-building', 'fa-building-o', 
                'fa-bullhorn', 'fa-bullseye', 'fa-cab', 'fa-calendar', 'fa-calendar-o', 'fa-camera', 
                'fa-camera-retro', 'fa-car', 'fa-caret-square-o-down', 'fa-caret-square-o-left', 
                'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-certificate', 'fa-check', 
                'fa-check-circle', 'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 
                'fa-child', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 
                'fa-clock-o', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-code', 
                'fa-code-fork', 'fa-coffee', 'fa-bar-chart-o', 'fa-cog', 'fa-cogs', 'fa-comment', 
                'fa-comment-o', 'fa-comments'];

  
  var ImageList = function(count) {
    var images = _.shuffle(IMAGES).slice(0, count / 2);

    var imageColorMap = _.map(images, function(image) {
      var color = _.shuffle(COLORS).shift();
      return {image: image, color: color};
    });

    this.images = _.shuffle(imageColorMap.concat(_.clone(imageColorMap)));
  };

  return ImageList;
});
