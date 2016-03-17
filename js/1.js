d3.select('.wordCloud')
  .selectAll('div')
  .data(wordcounts)
  .enter()
  .append('div')
  .style(
    'display',
    function (d) {
      return 'inline-block';
    }
  )
  .style(
    'font-size',
    function (d) {
      return (10*Math.sqrt(d[1]-2)) + "px";
    }
  )
  .style(
    'color',
    function (d, i) {
      if (i % 2 == 0)
        return 'grey';
      else
        return 'black';
    })
  .text(function (d) { return d[0]; });
