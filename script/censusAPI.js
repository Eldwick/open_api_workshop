var CensusData = []

function getCensusData() {
  var baseUrl = "http://api.usatoday.com/open/census/rac?api_key=tvgts2vaam689wtdzzgnxmv8",
      censusData;

  $.ajax({
      url: baseUrl,
      dataType: "jsonp",
      success: function(data) {
        CensusData = data.response
        constructStateRacialChart()
      }
  })
}

function stateRacialDataSeries() {
  var whiteData = {
        name: "White",
        data: []
      },
      blackData = {
        name: "Black",
        data: []
      },
      asianData = {
        name: "Asian",
        data: []
      },
      twoMoreData = {
        name: "Two or More",
        data: []
      };


  for (var i = 0, censusDataLength = CensusData.length, stateData; i < censusDataLength; i++){
      stateData = CensusData[i]
      whiteData.data.push(parseFloat(stateData.PctWhite) * 100)
      blackData.data.push(parseFloat(stateData.PctBlack)* 100)
      asianData.data.push(parseFloat(stateData.PctAsian)* 100)
      twoMoreData.data.push(parseFloat(stateData.PctTwoOrMore)* 100)
  }

  return [whiteData,blackData,asianData,twoMoreData];
}

function createStateNameArray() {
  var stateNames = []
  for (var i = 0, censusDataLength = CensusData.length, stateData, stateObj; i < censusDataLength; i++){
    stateData = CensusData[i]
    stateNames.push(stateData.Placename)
  }
  return stateNames
}

function constructStateRacialChart() {
  $('#container').highcharts({
          chart: {
              type: 'bar',
              height: 1200,
          },
          title: {
              text: 'Census Data'
          },
          xAxis: {
              categories:createStateNameArray()
          },
          yAxis: {
              title: {
                  text: 'Percent (%)'
              }
          },
          series: stateRacialDataSeries()
      });
}

$(document).ready(function() {

  // getCensusData()

})