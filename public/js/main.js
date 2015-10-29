var locations = ["China","Cambodia","Sri Lanka","India","Bangladesh","Turkey","United States","Philippines","Myanmar", "Morocco","South Korea","Romania"];
var locationNumbers = [];

// // var socket = io(.connect('http://localhost:8080/'));
//       var socket = io();
      
//       socket.on('connect', function() {
//         console.log("Connected");
//       });

//       socket.on('new clothes', function (data) {
//         //console.log(data.x + " " + data.y);
//         visualizeData(data);
//       });

window.addEventListener('onload',init());


function init(){

	$('#add-new').hide();
  $('#what-to-wear').hide();
  $('#sub-header').hide();
  $('#sub-menu').hide();

	$('#add-new-button').click(function(){
     $('#weather-result').empty();
      $('#input-city').empty();
            $('#sub-header').fadeOut('slow');
  $('#sub-menu').fadeOut('slow');
		$('#report').fadeOut('slow');
    $('#cover').fadeOut('slow');
    $('#what-to-wear').fadeOut('slow');
 		$('#add-new').fadeIn('slow');
 	});

    $('#cover-add-new').click(function(){
           $('#weather-result').empty();
      $('#input-city').empty();

        $('#sub-header').fadeOut('slow');
  $('#sub-menu').fadeOut('slow');
    $('#report').fadeOut('slow');
    $('#cover').fadeOut('slow');
    $('#what-to-wear').fadeOut('slow');
    $('#add-new').fadeIn('slow');

  });

    $('#report-button').click(function(){
           $('#weather-result').empty();
      $('#input-city').empty();

        $('#sub-header').fadeOut('slow');
  $('#sub-menu').fadeOut('slow');
    $('#add-new').fadeOut('slow');
    $('#what-to-wear').fadeOut('slow');
    $('#cover').fadeIn('slow');
    $('#report').fadeIn('slow');
  });

    $('#what-to-wear-button').click(function(){
           $('#weather-result').empty();
      $('#input-city').empty();

      $('#sub-header').fadeOut('slow');
      $('#sub-menu').fadeOut('slow');
    $('#add-new').fadeOut('slow');
    $('#cover').fadeOut('slow');
    $('#report').fadeOut('slow');
    $('#what-to-wear').fadeIn('slow');
  });

    $('#sub-wardrobe-button').click(function(){
      $('html, body').animate({
        scrollTop: $("#report").offset().top
      }, 1000);
    });

        $('#sub-color-button').click(function(){
      $('html, body').animate({
        scrollTop: $("#color-chart").offset().top
      }, 1000);
    });

    $('#sub-pattern-button').click(function(){
      $('html, body').animate({
        scrollTop: $("#pattern-chart").offset().top
      }, 1000);
    });

    $('#sub-material-button').click(function(){
      $('html, body').animate({
        scrollTop: $("#material-chart").offset().top
      }, 1000);
    });

        $('#sub-location-button').click(function(){
      $('html, body').animate({
        scrollTop: $("#map-chart").offset().top
      }, 1000);
    });

        $('#sub-top-button').click(function(){
$("html, body").animate({ scrollTop: 0 }, "slow"); 
    });
         

//     $.getJSON('data/wardrobe.json',function(data){

// 	visualizeData(data);
// });
  jQuery.ajax({
    url : '/api/get',
    dataType : 'json',
    success : function(response) {
      console.log(response);
      var data = response.wardrobe;
      visualizeData(data);


    }
  }); 


$('#view-button').click(function() {
    $('html, body').animate({
        scrollTop: $("#report").offset().top
    }, 1000);
});

var inputColor =""; 
var inputPattern= "";
var inputSeason= "";
var inputYear= "";
var inputMaterial = "";
var inputCategory ="";
$("#dropdown-category li").click(function(){

  inputCategory=this.innerHTML;
$('#input-category').text(inputCategory);
});

$('#input-color .btn').click(function(){
  $('#input-color .btn').css("backgroundColor","#FFF");
  $('#input-color .btn').css("color","#2A2A2A");
  $(this).css("background-color","#2A2A2A");
  $(this).css("color","#FFF");
  inputColor= this.innerHTML;
});

$('#input-pattern .btn').click(function(){
  $('#input-pattern .btn').css("backgroundColor","#FFF");
  $('#input-pattern .btn').css("color","#2A2A2A");
  $(this).css("background-color","#2A2A2A");
  $(this).css("color","#FFF");
  inputPattern= this.innerHTML;
});

$('#input-material .btn').click(function(){
  $(this).css("background-color","#2A2A2A");
  $(this).css("color","#FFF");
  inputMaterial+= " "+this.innerHTML;
});

$('#input-season .btn').click(function(){
  $('#input-season .btn').css("backgroundColor","#FFF");
  $('#input-season .btn').css("color","#2A2A2A");
  $(this).css("background-color","#2A2A2A");
  $(this).css("color","#FFF");
  inputSeason= this.innerHTML;
});

$("#dropdown-year li").click(function(){
  inputYear=this.innerHTML;
$('#input-year').text(inputYear);
});

$('#add-button').click(function(){

  var obj = {
    "color":inputColor,  //button
    "category":inputCategory.toString().toLowerCase(),
    "pattern":inputPattern.toString().toLowerCase(),  //button
    "brand":$('#input-brand').val(),
    "material":inputMaterial.toString().toLowerCase(),  //button
    "style":$('#input-style').val().toLowerCase(),
    "purchasingTime":inputSeason.toString().toLowerCase()+" "+inputYear.toString().toLowerCase(),
    "madeIn":$('#input-location').val()
  }

  // socket.emit('new clothes',obj);
  location.reload();

});

  $('#city-button').click(function(){
    $('#weather-result').empty();

    var cityName=$('#input-city').val();
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units=imperial";
    $.get(url, function (response) {
      var resultDescription = "Weather in "+ cityName + " is "+ response.weather[0].description+".";
      var resultClothes="";
      var temp=response.main.temp;
         var resultContainer = document.getElementById("weather-result");
      var pic = document.createElement("img");
      if(temp<50){
        if(response.weather[0].id> 500 && response.weather[0].id< 600){
          resultClothes="outwears";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Bring your raincoat.";
        }else{
          resultClothes="outwears";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Bring your coat.";
        }
      }else if(temp >=50 && temp <= 70){
       if(response.weather[0].id> 500 && response.weather[0].id< 600){
          resultClothes="outwears";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Bring your raincoat.";
        }else{
          resultClothes="sweatshirts";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Wear your sweatshirt and enjoy your day!";
        }
      }else if(temp > 70){
        if(response.weather[0].id> 500 && response.weather[0].id< 600){
          resultClothes="outwears";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Bring your raincoat.";
        }else{
          resultClothes="top";
          pic.src = "svg/"+ resultClothes +".png";
          resultDescription+=" Enjoy your day!";
        }
      }
      
      
      pic.className= "icon";
      
      var desBlock=document.createElement("div");
      desBlock.innerHTML=resultDescription;
      resultContainer.appendChild(desBlock);
      resultContainer.appendChild(pic);


  
     $("#input-city").html("");
   });
  });

    $("html, body").animate({ scrollTop: 0 }, "slow"); 
  return false; 

}

  $('#header').affix({
    offset: {
      top: 620
    }
  });

  var $animation_elements = $('.animation-element');
  var $window = $(window);
  $window.on('scroll', check_if_in_view);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });



    var element_height = $('#report').outerHeight();
    var element_top_position = $('#report').offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_top_position+window_height -200) <= window_bottom_position) {
      $('#sub-header').fadeIn('slow');
      $('#sub-menu').hide();
    } else {
      $('#sub-header').hide();
    }

    $('#sub-header').mouseover(function(){
      $('#sub-menu').slideDown();
    });

    $('#sub-header').mouseleave(function(){
      $('#sub-menu').slideUp();
    });






}

function visualizeData(data){
  
    var total = data.length;
    buildLineChart(data);

//------------------------------CATEGORY--------------------------//

    var categories = ["dresses","tops","sweatshirts","sweaters","skirts","jeans","shorts","jumpsuits","outwears"];
    for(var j = 0; j < categories.length; j++){
      var amount = 0;
      for(var i = 0; i < data.length; i++){  
        if(data[i].category == categories[j]){
          amount++;
        }
      }
      var iconContainer = document.getElementById("wardrobe");
      var pic = document.createElement("img");
      pic.src = "svg/"+ categories[j] +".png";
      pic.className= "icon";
      var h = pic.height;
      var w = pic.width;
      var block = document.createElement("div");
      block.id = j+"-"+i;
      block.className = "block col-md-4";
      var tag = document.createElement("div");
      tag.className = "tag";
      var categoryName = document.createElement("div");
      categoryName.innerHTML = categories[j];
      var number = document.createElement("div");
      number.className = "amount";
      number.innerHTML= amount;
      tag.appendChild(categoryName);
      tag.appendChild(number);
      block.appendChild(pic);
      block.appendChild(tag);
      iconContainer.appendChild(block);
    }
//------------------------------COLOR--------------------------//
    var colors = ["black","navy","blue","medium wash","light wash","grey","khaki","mustard","orange","red","pink","white"];
    var colorNumbers = [];
    
    var colorData = [
    {
        value: colorNumbers[0],
        color:"#231f20",
        highlight: "#56565c",
        label: "Black"
    },
    {
        value: colorNumbers[1],
        color: "#000080",
        highlight: "#3D59AB",
        label: "Navy"
    },
            {
        value: colorNumbers[2],
        color: "#2980b9",
        highlight: "#2980b9",
        label: "Blue"
    },
            {
        value: colorNumbers[3],
        color: "#36648B",
        highlight: "#4F94CD",
        label: "Medium Wash"
    },

        {
        value: colorNumbers[4],
        color: "#A4D3EE",
        highlight: "#B0E2FF",
        label: "Light Wash"
    },

        {
        value: colorNumbers[5],
        color: "#7f8c8d",
        highlight: "#95a5a6",
        label: "Grey"
    },
        {
        value: colorNumbers[6],
        color: "#808000",
        highlight: "#BDB76B",
        label: "Khaki"
    },
            {
        value: colorNumbers[7],
        color: "#f1c40f",
        highlight: "#FFC870",
        label: "Mustard"
    },
        {
        value: colorNumbers[8],
        color: "#d35400",
        highlight: "#e67e22",
        label: "Orange"
    },
        {
        value: colorNumbers[9],
        color: "#c0392b",
        highlight: "#e74c3c",
        label: "Red"
    },

        {
        value: colorNumbers[10],
        color: "#FFAEB9",
        highlight: "#FFB6C1",
        label: "Pink"
    },
        {
        value: colorNumbers[11],
        color: "#fff",
        highlight: "#fff",
        label: "White"
    }
]


    for(var j = 0; j < colors.length; j++){
      // $('#input-color .btn').css("background-color","");
      var amount = 0;
      for(var i = 0; i < data.length; i++){  
        if(data[i].color == colors[j]){
          amount++;
        }
      }
      colorNumbers.push(amount);
    }

    for (var i=0; i<colors.length; i++){
      var percent = colorNumbers[i]/ total;
      var width = $("#color-chart").width();
      var colorBar = document.createElement("div");
      colorBar.className="colorBar";
      colorBar.id = colors[i];
      colorBar.style.backgroundColor=colorData[i].color;
      $(colorBar).width(percent*width);
      $(colorBar).height(50);
      $("#color-chart").append(colorBar);
    }

      $('.colorBar').each(function(){
        $(this).hover(function(){
          $(this).text(this.id);
        });
        $(this).mouseleave(function(){
          $(this).text('');
        });
      });

//------------------------------PATTERN--------------------------//

var patterns = ["solid","patterns"];
var patternNumbers = [];

      var amount = 0;
      for(var i = 0; i < data.length; i++){  
        if(data[i].pattern == patterns[0]){
          amount++;
        }
      }
      patternNumbers.push(amount);
      patternNumbers.push(total-amount);

for(var i = 0; i < patterns.length; i ++){
      var percent = patternNumbers[i]/ total;
      
      var patternBar = document.createElement("div");
      patternBar.className="patternBar";
      patternBar.id = patterns[i];
      patternBar.style.backgroundImage = "url(svg/pattern"+i+".png)";
      $(patternBar).width(percent*width);
      $(patternBar).height(50);
      $("#pattern-chart").append(patternBar);
}

      $('.patternBar').each(function(){
        $(this).hover(function(){
          $(this).text(this.id);
        });
        $(this).mouseleave(function(){
          $(this).text('');
        });
      });

//------------------------------MATERIAL--------------------------//

var materials = ["polyester","spandex","cotton","silk","rayon","acrylic","nylon","cashmere","polyamide","en","viscose","wool","leather","down"];
var materialNumbers = [];

for(var j = 0; j < materials.length; j++){
  var amount = 0;
  for(var i=0; i < data.length; i++){
    for(var n = 0; n < data[i].material.length; n++){
           if (data[i].material[n].search(materials[j]) >= 0 ) {
        amount++;
    }
    }

  }
      materialNumbers.push(amount);
      var newMaterial = document.createElement("div");
      newMaterial.className="materials";
      newMaterial.innerHTML= materials[j];
      newMaterial.style.fontSize=10*parseInt(amount);
      newMaterial.style.fontSize=10*amount;
            // $(newMaterial).html('<a href="http://https://en.wikipedia.org/wiki/'+materials[j]+'/">'+materials[j]+'</a>');

       $(newMaterial).css({ fontSize: 10*amount });
       $("#material-chart").append(newMaterial);
    }

//------------------------------LOCATION--------------------------//

      for(var j = 0; j < locations.length; j++){
      var amount = 0;
      for(var i = 0; i < data.length; i++){  
        if(data[i].madeIn == locations[j]){
          amount++;
        }
      }
      locationNumbers.push(amount);
    }



}

function buildLineChart(data){
    var purchaseDates = ["spring 2012","summer 2012","fall 2012","winter 2012","spring 2013","summer 2013","fall 2013","winter 2013","spring 2014","summer 2014","fall 2014","winter 2014","spring 2015","summer 2015","fall 2015","winter 2015"];
  var purchaseNumbers = [];

for(var j = 0; j < purchaseDates.length; j++){
  var amount = 0;
  for(var i=0; i < data.length; i++){
     if (data[i].purchasingTime == purchaseDates[j] ) {
        amount++;
    }
  }
      purchaseNumbers.push(amount);
    }

  // now, can use that data to build the line chart
  var data = {
    // chart labels; we created them above
    labels: purchaseDates,
    // an array of datasets to plot
    datasets: [
        // dataset 1
        {
            label: purchaseNumbers,
            strokeColor: "#33AAAE",
            pointColor: "#33AAAE",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "#2A4786",
            // the data values that actually get plotted
            data: purchaseNumbers
        }
    ],
    // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"    
  };  

  // create chart options (this is optional)
  // see list of options:
  // http://www.chartjs.org/docs/#line-chart-chart-options
  var options = {
    datasetStroke : false,
    datasetFill : false
  }

  // NOW, we actually create the chart
  // first, get the context of the canvas where we're drawing the chart
  var ctx = document.getElementById("time-line-chart").getContext("2d");
  
  // now, create the line chart, passing in:
  // 1. the data (required)
  // 2. chart options (optional)
  var myLineChart = new Chart(ctx).Line(data, options); 
  // create the legend
  var chartLegend = myLineChart.generateLegend();
  // // append it above the chart
  // $('#lineChartLegend').append(chartLegend);
}

var mapData= [
      {
        "code": "CN",
        "name": "China",
        "value": 14,
        "color": "#eea638"
      },
      {
        "code": "KH",
        "name": "Cambodia",
        "value": 2,
        "color": "#eea638"
      }, 
      {
        "code": "LK",
        "name": "Sri Lanka",
        "value": 1,
        "color": "#eea638"
      }, 
      {
        "code": "IN",
        "name": "India",
        "value": 4,
        "color": "#eea638"
      }, 
      {
        "code": "BD",
        "name": "Bangladesh",
        "value": 5,
        "color": "#eea638"
      }, 
      {
        "code": "TR",
        "name": "Turkey",
        "value": 5,
        "color": "#d8854f"
      }, 
      {
        "code": "US",
        "name": "United States",
        "value": 1,
        "color": "#a7a737"
      },
      {
        "code": "PH",
        "name": "Philippines",
        "value": 2,
        "color": "#eea638"
      },
      {
        "code": "MM",
        "name": "Myanmar",
        "value": 1,
        "color": "#eea638"
      },  
      {
        "code": "MA",
        "name": "Morocco",
        "value": 1,
        "color": "#de4c4f"
      }, 
       {
        "code": "KP",
        "name": "South Korea",
        "value": 1,
        "color": "#eea638"
      },
      {
        "code": "RO",
        "name": "Romania",
        "value": 1,
        "color": "#d8854f"
      }
      ]

      var latlong = {};
      latlong["CN"] = {
        "latitude": 35,
        "longitude": 105
      };
            latlong["KH"] = {
        "latitude": 13,
        "longitude": 105
      };
            latlong["LK"] = {
        "latitude": 7,
        "longitude": 81
      };
          latlong["IN"] = {
        "latitude": 20,
        "longitude": 77
      };
            latlong["BD"] = {
        "latitude": 24,
        "longitude": 90
      };
            latlong["TR"] = {
        "latitude": 39,
        "longitude": 35
      };
            latlong["US"] = {
        "latitude": 38,
        "longitude": -97
      };
            latlong["PH"] = {
        "latitude": 13,
        "longitude": 122
      };
            latlong["MM"] = {
        "latitude": 22,
        "longitude": 98
      };
            latlong["MA"] = {
        "latitude": 32,
        "longitude": -5
      };
            latlong["KP"] = {
        "latitude": 40,
        "longitude": 127
      };
          latlong["RO"] = {
        "latitude": 46,
        "longitude": 25
      };



    var map;
      var minBulletSize = 15;
      var maxBulletSize = 70;
      var min = Infinity;
      var max = -Infinity;

      AmCharts.theme = AmCharts.themes.black;

      // get min and max values
      for (var i = 0; i < mapData.length; i++) {
        var value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      // build map
      AmCharts.ready(function() {
        map = new AmCharts.AmMap();


        map.areasSettings = {
          unlistedAreasColor: "#FFFFFF",
          unlistedAreasAlpha: 0.1
        };
        map.imagesSettings = {
          balloonText: "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>",
          alpha: 0.6
        }

        var dataProvider = {
          mapVar: AmCharts.maps.worldLow,
          images: []
        }

        // create circle for each country

        // it's better to use circle square to show difference between values, not a radius
        var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
        var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

        // create circle for each country
        for (var i = 0; i < mapData.length; i++) {
          var dataItem = mapData[i];
          var value = dataItem.value;
          // calculate size of a bubble
          var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
          if (square < minSquare) {
            square = minSquare;
          }
          var size = Math.sqrt(square / (Math.PI * 2));
          var id = dataItem.code;

          dataProvider.images.push({
            type: "circle",
            width: size,
            height: size,
            color: dataItem.color,
            longitude: latlong[id].longitude,
            latitude: latlong[id].latitude,
            title: dataItem.name,
            value: value
          });
        }



        map.dataProvider = dataProvider;

        map.write("mapdiv");
    });