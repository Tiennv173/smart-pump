// Generates GET requests to a URL.
    function httpGet(Url){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", Url, false);
      xmlHttp.send(null);
      return xmlHttp.responseText;
    }
    window.onload=function(){
      // GET request to localhost:3000/test, which has been configured to send back our db data
      var aData = JSON.parse(httpGet('http://localhost:3000/test'));

      var dataLength = 30; // number of dataPoints visible at any point
    var updateInterval = 5000;


      var seriesData = {
        series_0: [],
        series_1: [],
        series_2: [],
        series_3: []
      };
      // Push the data into the seriesData object's arrays.
      for(var n = 0; n < dataLength; n++){
        seriesData['series_0'].push(aData[n]['series0']);
        seriesData['series_1'].push(aData[n]['series1']);
        seriesData['series_2'].push(aData[n]['series2']);
        seriesData['series_3'].push(aData[n]['series3']);
      }

      var updateChart = function() {

      // Render the chart using the data from Mongo
        zingchart.render({
        id:"myChart",
        width:"100%",
        height:400,
        data:{
          "type":"line",
          "title":{
            "text":"Dynamic Humidity"
          },
          "plot":{
            "line-width":1,
            "aspect":"spline",
            "marker":{
              "visible":false
            }
          },
          "scale-x": {
            "min-value": new Date().getTime()-(1800000*(dataLength-1)),
                "shadow": 0,
                "step": 1800000,
                "transform": {
                    "type": "date",
                    "all": "%D, %d %M<br />%h:%i %A",
                    "guide": {
                        "visible": false
                    },
                    "item": {
                        "visible": false
                    }}
          },
          "series":[
            {
              "values":seriesData['series_0']
            }
          ]
        }
      });
        dataLength++;
        seriesData['series_0'].push(aData[dataLength]['series0']);
        seriesData['series_1'].push(aData[dataLength]['series1']);
        seriesData['series_2'].push(aData[dataLength]['series2']);
        seriesData['series_3'].push(aData[dataLength]['series3']);
        seriesData['series_0'].shift();
        seriesData['series_1'].shift();
        seriesData['series_2'].shift();
        seriesData['series_3'].shift();

      }
    updateChart();
    setInterval(function(){updateChart()}, updateInterval);

    };