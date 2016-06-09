var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var xScale = d3.scale.linear().domain([0, width]);
var yScale = d3.scale.linear().domain([0, height]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/MCBuildingProxSensorData/csv/proxMobileOut-MC2.csv", function(data) {
  // Parse data
  data.forEach(function(d) {
    d.timestamp = new Date(d.timestamp);
    d.prox_id = d['prox-id'];
    d.floor = +d.floor;
    d.x = +d.x;
    d.y = +d.y;
  });

  svg.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })
      .style("fill", function(d) { return color(d.prox_id); })
      .style("fill-opacity", "0.01");

});
