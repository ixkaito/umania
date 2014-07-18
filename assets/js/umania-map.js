var AQUATIC = '水棲';
var ANTHROPOID = '人間・類人猿';
var MAMMALS = '哺乳類';
var REPTILES = '爬虫類';

function gencat() {
  var v = Math.random();
  if (v < 0.25) {
    return AQUATIC;
  } else if (v < 0.5) {
    return ANTHROPOID;
  } else if (v < 0.75) {
    return MAMMALS;
  } else {
    return REPTILES;
  }
}

function convert(d) {
  return {
    lat: +d.lat,
    lon: +d.lon,
    category: gencat(),
    popularity: Math.random()
  };
}

d3.csv('cryptids.csv', convert, function(cryptids) {
  d3.json('map.json', function(data) {
    d3.select('#map')
      .call(drawMap({
        cryptids: cryptids,
        geo: topojson.feature(data, data.objects.countries),
        width: 320,
        height: 320
      }));
  });
});


function drawMap(options) {
  var cryptids = options.cryptids;
  var geo = options.geo;
  var width = options.width;
  var height = options.height;
  var mercator = d3.geo.mercator()
    .rotate([225, 0, 0])
    .translate([472, 472])
    ;
  var path = d3.geo.path()
    .projection(mercator);
  var circleScale = d3.scale.linear()
    .domain(d3.extent(cryptids, function(d) {
      return d.popularity;
    }))
    .range([10, 40]);
  var scaleX = width / 944;
  var scaleY = height / 944;

  return function(svg) {
    svg
      .attr({
        width: width,
        height: height
      });
    svg
      .append('rect')
      .classed('background', true)
      .attr({
        width: width,
        height: height
      });
    var contents = svg.append('g')
      .classed('contents', true)
      .attr('transform', 'scale(' + scaleX + ',' + scaleY + ')');

    // draw map
    contents
      .selectAll('path.country')
      .data(geo.features)
      .enter()
      .append('path')
      .classed('country', true)
      .attr('d', path);

    // draw cryptids
    contents
      .selectAll('circle.cryptids')
      .data(cryptids)
      .enter()
      .append('circle')
      .classed({
        cryptids: true,
        aquatic: function(d) {
          return d.category.indexOf(AQUATIC) >= 0;
        },
        anthropoid: function(d) {
          return d.category.indexOf(ANTHROPOID) >= 0;
        },
        mammals: function(d) {
          return d.category.indexOf(MAMMALS) >= 0;
        },
        reptiles: function(d) {
          return d.category.indexOf(REPTILES) >= 0;
        }
      })
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
