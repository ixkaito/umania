var cryptids = [
  {
    name: 'ビッグフット',
    lat: 51,
    lon: -107,
    popularity: 10,
    category: '人間・類人猿'
  },
  {
    name: '河童',
    lat: 35,
    lon: 135,
    popularity: 5,
    category: '水棲'
  },
  {
    name: 'ジャージーデビル',
    lat: 40,
    lon: -74,
    popularity: 1,
    category: '哺乳類'
  },
  {
    name: 'タッツェルブルム',
    lat: 46,
    lon: 10,
    popularity: 3,
    category: '爬虫類'
  }
];

d3.json('map.json', function(data) {
  d3.select('#map')
    .call(drawMap({
      geo: topojson.feature(data, data.objects.countries),
      width: 480,
      height: 500
    }));
});


function drawMap(options) {
  var geo = options.geo;
  var width = options.width;
  var height = options.height;
  var mercator = d3.geo.mercator()
    .rotate([225, 0, 0])
    .center([0, 0])
    .translate([width / 2, height / 2])
    .scale(100)
    ;
  var path = d3.geo.path()
    .projection(mercator);
  var circleScale = d3.scale.linear()
    .domain(d3.extent(cryptids, function(d) {
      return d.popularity;
    }))
    .range([10, 40]);

  return function(svg) {
    svg
      .attr({
        width: width,
        height: height
      });

    // draw map
    svg
      .append('rect')
      .classed('background', true)
      .attr({
        width: width,
        height: height
      });
    svg
      .selectAll('path.country')
      .data(geo.features)
      .enter()
      .append('path')
      .classed('country', true)
      .attr('d', path);

    // draw cryptids
    svg
      .selectAll('circle.cryptids')
      .data(cryptids)
      .enter()
      .append('circle')
      .classed('cryptids', true)
      .attr({
        cx: function(d) {
          return mercator([d.lon, d.lat])[0];
        },
        cy: function(d) {
          return mercator([d.lon, d.lat])[1];
        },
        r: function(d) {
          return circleScale(d.popularity);
        }
      });
  };
}
