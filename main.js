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


var data = [800, 100, 200, 320, 50, 500, 300, 115, 333, 777, 423, 123, 221, 733, 801, 55, 70, 99, 60, 653];

var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    .style('fill', 'DarkGreen')
    .attr("class", "bar")
    .attr("x", function(d) { return x(d); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); });

d3.select("input").on("change", change);

function change() {
    quickSortInPlace();
}

function colorizePivot(index) {
    svg.selectAll(".bar")
        .each(function (d, i) {
            if (i === index) {
                d3.select(this).style('fill', 'red');
            }
        });
}

function recolorize() {
    svg.selectAll(".bar").style('fill', 'DarkGreen');
}

function animate() {

    var x0 = x.domain(data
        .slice());

   svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a) - x0(b); });

    var transition = svg.transition().duration(500),
        delay = function(d, i) { return i * 25; };

    // kick off animation for bars
    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d); });

    // kick off animation for x labels
    transition.selectAll(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay(delay);
}

function quickSortInPlace(){
    animate();
    async function qs(fst, lst) {
        if (fst >= lst) {
            return
        }
        let pivot = data[lst];
        colorizePivot(lst)
        let i = fst;
        let j = lst;
        while (i <= j) {
            while (data[i] < pivot) { i++; }
            while (data[j] > pivot) { j--; }
            if (i <= j) {
                let tmp = data[i];
                data[i] = data[j];
                data[j] = tmp;
                if (i !== j ) {
                    animate();
                    await sleep(500);
                }
                i++;
                j--;
            }
        }
        recolorize();
        await qs(fst, j);
        await qs(i, lst);
    }
    qs(0, data.length - 1)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
