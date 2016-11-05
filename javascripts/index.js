// Grab the embed's contentWindow by the iframe id
       var plot = document.getElementById('RTA').contentWindow;
       var index_a=2002
       var index_b=2008
       var tech=0
       var x = 0
       var y = 1
       var techno=0

  var slider = 
    $( "#slider-range" ).slider({
      range: true,
      min: 2000,
      max: 2014,
      animate: "slow",
      values: [ 2002, 2009 ],
      slide: function( event, ui ) {
        $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      },
      stop: function(event, ui) {
            $( "#year0" ).val(ui.values[ 0 ]);
      }
    });
    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
    $( "#year0" ).val( $( "#slider-range" ).slider( "values", 0 ));
  
$( "#slider-range" ).on( "slidestop", function( event, ui ) {
      go()
    });

var rad = document.myForm.rads;
var prev = null;



for(var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        (prev)? console.log(prev.value):null;
        if(this !== prev) { prev = this; }
        type = this.value;
        if (this.value=="electric") {var tech=0};  
        if (this.value=="batteries") {var tech=1}; 
        if (this.value=="wind") {var tech=2};
        if (this.value=="solar") {var tech=4};
        $("#tech").val(tech)
	      go();
    };
}


function go() {
      var values = $( "#slider-range" ).slider( "values" );
      techno=rad.value
      if (techno=="electric") {var tech=0};  
      if (techno=="batteries") {var tech=1}; 
      if (techno=="wind") {var tech=2};
      if (techno=="solar") {var tech=4};
      var index_a = values[0] - 2000
      var index_b= values[1] - 2000
      trace1 = (index_b-index_a)*8+96*index_a-(index_a*(index_a-1)*4) + tech*2 
      trace2 = trace1+1
      $("#trace").val(trace1)
  plot.postMessage({
              'task': 'restyle',
              'update': {'visible':false},
          },
        'https://plot.ly');
  plot.postMessage({
              'task': 'restyle',
              'update': {'visible':true},
              'indices':[trace1, trace2]
          },
        'https://plot.ly');  
}