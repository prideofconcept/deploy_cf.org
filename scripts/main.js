//console.log('\'Allo \'Allo!');
var currentStage = function() { return $('.js-dstage .current') };

$(document).on('click', '.js-dstage .js-next', function(e){
  e.preventDefault();

  currentStage();
});
