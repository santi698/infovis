//text = ?
$(document).ready(function () {
  $.get('http://www.infovis-wiki.net/index.php?title=Information_Visualization', function (data) {
    nodes = $(data)
    infovis_text = nodes.find('.infovis-quotation').text()
    infovis_text = infovis_text\
      .toLowerCase()\
      .replace(/\[[^\]]*\]/, ' ')\ // Remove all [*]
      .replace(/[^\w ]/, ' ')\ // Replace all non alphabetic or spaces with spaces
      .replace(/\s\s+/, ' ')\ // Replace multiple spaces with just 1 space
      .split()
    words = infovis_text.map(word => word.singularize())
  })
})
