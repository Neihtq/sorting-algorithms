var myData = [800, 100, 200, 320, 50, 500, 300, 115];

var margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 50
};
var tmp = myData.slice();

tmp.sort(function (a,b) {
    return a - b;
});

var colorPalette = {};
for (i = 0; i < tmp.length; i++) {
    colorPalette[tmp[i]] = i
}

var height = 1080 - margin.top - margin.bottom;
var width = 1920 - margin.right - margin.left;
var barWidth = 35;
var barOffset = 5;
var animeDuration = 700;
var animateDelay = 30;

var yScale = d3.scale.linear()
    .domain([0, d3.max(myData)])
    .range([0, height]);

var xScale = d3.scale.ordinal()
    .domain(myData)
    .rangeRoundBands(myData, .1, 1);

var colors = d3.scale.linear()
    .domain([0, myData.length])
    .range(['#90ee90', '#30c230']);

var data = [800, 100, 200, 320, 50, 500, 300, 115];

var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format("d");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data);
y.domain([0, d3.max(data)]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px");

svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .style('fill', function (d, i) {
        return colors(colorPalette[d])
    })
    .attr("class", "bar")
    .attr("x", function(d) { return x(d); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); })

d3.select("input").on("change", change);

var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
}, 2000);

function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b - a; }
        : function(a, b) { return d3.ascending(a, b); })
        .slice());

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a) - x0(b); });

    var transition = svg.transition().duration(500),
        delay = function(d, i) { return i * 25; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d); });

    transition.select(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay(delay);
}
