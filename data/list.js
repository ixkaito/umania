d3.select('table')
  .selectAll('tr td:first-child a')
  .each(function() {
    d3.select('body').append('p').text(d3.select(this).attr('href'));
  });
