$(document).ready(function () {
  makeSelectionGraph()
})

function makeSelectionGraph() {
  d3.json('/infovis/selection/data/points.json', function (data) {
    d3.select('#graph')
      .attr('width', 200)
      .attr('height', 200)
      .attr("style", "background-color: rgb(220,220,220);")
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function (datum) { return datum.x * 20; })
      .attr('cy', function (datum) { return datum.y * 20; })
  });
}
