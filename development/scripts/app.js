var jsonData = [
    {
        "slider1": 64,
        "slider2": 56,
        "slider3": 68,
        "slider4": 11,
        "slider5": 24
    },
    {
        "slider1": 10,
        "slider2": 61,
        "slider3": 16,
        "slider4": 66,
        "slider5": 34
    },
    {
        "slider1": 86,
        "slider2": 34,
        "slider3": 83,
        "slider4": 13,
        "slider5": 67
    },
    {
        "slider1": 25,
        "slider2": 27,
        "slider3": 33,
        "slider4": 36,
        "slider5": 44
    },
    {
        "slider1": 32,
        "slider2": 89,
        "slider3": 92,
        "slider4": 65,
        "slider5": 52
    },
    {
        "slider1": 54,
        "slider2": 26,
        "slider3": 15,
        "slider4": 44,
        "slider5": 76
    },
    {
        "slider1": 98,
        "slider2": 46,
        "slider3": 19,
        "slider4": 100,
        "slider5": 67
    },
    {
        "slider1": 91,
        "slider2": 96,
        "slider3": 66,
        "slider4": 30,
        "slider5": 51
    },
    {
        "slider1": 75,
        "slider2": 60,
        "slider3": 37,
        "slider4": 14,
        "slider5": 49
    },
    {
        "slider1": 64,
        "slider2": 12,
        "slider3": 74,
        "slider4": 53,
        "slider5": 44
    }
];


var sliderArray = function(el) {
   var result = [];
   $.each( jsonData, function( index, value ){
      result.push(value[el]);
   });
   return result;
};


// Gat closest number from array
var closestNumber = function( arr, number) {
   var result = arr.reduce(function (prev, curr) {
     return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev);
   });
   return result;
};


$('.sliderRange').each( function() {
   var _this = $(this);
   _this.rangeslider({
      polyfill: false,
      onSlide: function(position, value) {
         
      },
      onSlideEnd: function(position, value) {
         var thisArray = sliderArray(_this.attr('id')),
             thisTextField = _this.prev();
         
        /* if( $.inArray( value, thisArray ) !== -1 ) {
            updateAll( thisArray.indexOf(value) );
         }*/
         
         /*console.log( closestNumber( thisArray, value ) );*/
         updateAll( thisArray.indexOf(closestNumber( thisArray, value )) );
         
      }
      
   }).on('input', function() {
       $('input.sliderText[data-index="'+$(this).data('index')+'"]').val($(this).val());
   });
});

// Update sliders on text input change or keyup
$('.sliderText').each( function() {
   $(this).on('change keyup', function() {
      $('input.sliderRange[data-index="'+$(this).data('index')+'"]').val($(this).val()).change();
   });
});

//Default animation state on slider hover
$('.input-slider').hover(function() {
   $(this).find('.rangeslider').toggleClass('no-animate');
});



// Update all text input boxes
function updateAll(arrIndex) {
   $('.sliderText').each( function() {
      var newValue = jsonData[arrIndex]["slider"+$(this).data('index')];
      $('input.sliderText[data-index="'+$(this).data('index')+'"]').val(newValue);
   });
   // Keyup called to force slider update
   $('.sliderText').keyup();
}
updateAll(4);



function randomRangeNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}