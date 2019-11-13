// set svg vars
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// set up svg
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// group charts
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("/assets/data/data.csv").then(function(data) {

    // number conversion
    data.forEach(function(xdata) {
        xdata.poverty = +xdata.poverty;
        xdata.obesity = +xdata.obesity;

    });

    // x function
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.poverty)*0.9,
            d3.max(data, d => d.poverty)*1.1])
        .range([0, width]);

    // y function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.obesity)*1.1])
        .range([height, 0]);

    // set bottom/left axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // y axis
    chartGroup.append("g")
        .call(leftAxis);

    // function for circles
    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", 12)
        .attr("fill", "maroon")
        .attr("opacity", 0.5);

    // add State abbrev to circles
    chartGroup.selectAll("text.text-circles")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.obesity))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("fill", "black");

    // y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .text("Obesity (%)")
        .classed("active",true);

    // x axis
    chartGroup.append("text")
        .attr("y", height + margin.bottom/2 - 10)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .text("Poverty Rate (%)")
        .classed("active",true);


});