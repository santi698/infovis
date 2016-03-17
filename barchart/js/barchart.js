data = [
  ['I felt creative', 88, 8, 4],
  ['I felt an emotional reaction', 66, 22, 12],
  ['I learned something new about the text', 63, 24, 13],
  ['It confirmed my understanding of the text', 57, 33, 10],
  ['It jogged my memory', 50, 35, 15],
  ['The Wordle confused me', 5, 9, 86]
       ];
X_LEFT = 20
X_LEFT_CHART = 300
X_SCALE = 2.2
RECT_HEIGHT = 30
X_GAP = 10
X_SEPARATION = RECT_HEIGHT + X_GAP

d3.select('svg')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', X_LEFT)
  .attr('y', function (d, i) {return X_LEFT + X_SEPARATION*i;})
  .attr('stroke', '2')
  .text(function (d) { return d[0]; })

rectangles = d3.select('svg')
  .selectAll('rect')
  .data(data)
  .enter();

rectangles.append('rect')
  .attr('x', X_LEFT_CHART)
  .attr('height', RECT_HEIGHT)
  .attr('y', function (d, i) {return X_SEPARATION*i;})
  .attr('width', function(d, i) {return X_SCALE*d[1];})
  .attr('fill', '#14d100');

rectangles.append('rect')
  .attr('height', RECT_HEIGHT)
  .attr('y', function (d, i) {return X_SEPARATION*i;})
  .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*d[1];})
  .attr('width', function(d, i) {return X_SCALE*d[2];})
  .attr('fill', '#ffd900');

rectangles.append('rect')
  .attr('height', RECT_HEIGHT)
  .attr('y', function (d, i) {return X_SEPARATION*i;})
  .attr('x', function (d, i) {return X_LEFT_CHART + X_SCALE*d[1] + X_SCALE*d[2];})
  .attr('width', function(d, i) {return X_SCALE*d[3];})
  .attr('fill', '#fb000d');
