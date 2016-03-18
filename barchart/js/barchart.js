data = [
  ['I felt creative', 88, 8, 4],
  ['I felt an emotional reaction', 66, 22, 12],
  ['I learned something new about the text', 63, 24, 13],
  ['It confirmed my understanding of the text', 57, 33, 10],
  ['It jogged my memory', 50, 35, 15],
  ['The Wordle confused me', 5, 9, 86]
       ];
X_LEFT = 20
Y_TOP = 23
X_LEFT_CHART = 300
X_SCALE = 3
RECT_HEIGHT = 35
X_GAP = 10
X_SEPARATION = RECT_HEIGHT + X_GAP

$(document).ready(function () {
  g = d3.select('svg')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {return "translate(0," + X_SEPARATION*i + ')';})

  g.append('text')
    .attr('x', X_LEFT)
    .attr('y', function (d, i) {return Y_TOP;})
    .text(function (d) { return d[0]; })

  g.append('rect')
    .attr('height', RECT_HEIGHT)
    .attr('x', X_LEFT_CHART)
    .attr('width', function(d, i) {return X_SCALE*d[1];})
    .classed('rect-positive', true);
  g.append('text')
    .classed('text-positive', true)
    .attr('y', function (d, i) {return Y_TOP;})
    .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*(d[1]/2) - 5;})
    .text(function (d) { return d[1]})

  g.append('rect')
    .classed('rect-neutral', true)
    .attr('height', RECT_HEIGHT)
    .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*d[1];})
    .attr('width', function(d, i) {return X_SCALE*d[2];})
  g.append('text')
    .classed('text-neutral', true)
    .attr('y', function (d, i) {return Y_TOP;})
    .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*(d[1] + d[2]/2) - 5;})
    .text(function (d) { return d[2]})

  g.append('rect')
    .classed('rect-negative', true)
    .attr('height', RECT_HEIGHT)
    .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*(d[1]+d[2]);})
    .attr('width', function(d, i) {return X_SCALE*d[3];})
  g.append('text')
    .classed('text-negative', true)
    .attr('y', function (d, i) {return Y_TOP;})
    .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*(d[1] + d[2] + d[3]/2) - 5;})
    .text(function (d) { return d[3]})
})
