function draw() {
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

function updateData() {
    var x0 = x.domain(data
        .slice());
    var y0 = y.domain([0, d3.max(data)]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .style('fill', 'DarkGreen')
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });

    var transition = svg.transition().duration(500),
        delay = function(d, i) { return i * 25; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y0(d); })
        .attr("height", function(d) { return height - y0(d); });

    transition.selectAll(".x.axis")
        .call(xAxis)
        .selectAll("g")
        .delay(delay);

}

function quickSortInPlace(){
    animate();
    async function qs(fst, lst) {
        animate();
        if (fst >= lst) {
            return
        }
        let pivot = data[lst];
        colorizePivot(lst)
        animate();
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
                    await sleep(650);
                }
                i++;
                j--;
            }
        }
        recolorize();
        animate();
        await qs(fst, j);
        await qs(i, lst);
    }
    qs(0, data.length - 1)
}

async function bubbleSort(){
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data.length - i - 1; j++){
            colorizePivot(j); 
            colorizePivot(j + 1);
            animate();
            await sleep(300);
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                animate();
                await sleep(500);
            }
            recolorize();
        }
    }
}


async function insertionSort() {
    for (i = 1; i < data.length; i++) {
        recolorize();
        colorizePivot(i);
        for (j = 0; j < i; j++) {
            if (data[i] < data[j]) {
                if (j == 0) {
                    left = data.slice(0, i);
                    right = data.slice(i + 1);
                    data = [data[i]].concat(left).concat(right)
                } else {
                    left = data.slice(0, j);
                    middle = data.slice(j, i);
                    right = data.slice(i+1);
                    data = left.concat([data[i]]).concat(middle).concat(right);
                }
                animate();
                await sleep(500);
                recolorize();
                break; 
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeChart() {
    if (data.length != 0) {
        data = [];
        d3.selectAll(".bar > *").remove();
        draw();
    }
}

function generate() {
    removeChart()
    data = new Array(10).fill(0).map(function(n) {
      return Math.floor(Math.random() * (500 - 10) + 10);
    });
    updateData();
    document.getElementById("shuffleBtn").disabled = false;
    document.getElementById("removeBtn").disabled = false;
}

function shuffle() {
    var currentIndex = data.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = data[currentIndex];
      data[currentIndex] = data[randomIndex];
      data[randomIndex] = temporaryValue;
    }
  
    updateData();
}


var data = [];

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

draw();

