(async function() {
// Define SVG area dimensions
const
svgWidth = 700,
svgHeight = 400;

// Define the chart's margins as an object
const chartMargin = {
top: 20,
right: 40,
bottom: 70,
left: 70
};

// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter area, append SVG area to it, and set the dimensions
const svg = d3.select("#scatter").append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
const chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data data.csv
const data = await d3.csv("assets/data/data.csv").catch(error => console.warn(error));
// Print the data
console.log(data);
// Parse data and cast as numbers
data.forEach(function(data) {
    data.poverty  = +data.poverty;
    data.obesity  = +data.obesity;
  });

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 25])
    .range([0, svgWidth]);
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x));

  // yLabel
 chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(chartHeight/2))
    .attr("y", -50)
    .text("Obesity (%)")
    .classed("active", true);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 30])
    .range([chartHeight, 0]);
  chartGroup.append("g")
    .call(d3.axisLeft(y));

    // xLabel
  chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight})`)
    .append("text")
        .attr("x", 0)
        .attr("y", 50)
        .text("Poverty (%)")
        .classed("active", true);

  // Add dots
  chartGroup.selectAll("g circle")
    .data(data)
    .enter()
    .append("g")
    .append("circle")
      .attr("cx", (d => x(d.obesity)-500))
      .attr("cy", (d => y(d.poverty)))
      .attr("r", 15)
      .style("fill", "#69b3a2")

  // Add text to dots
  chartGroup.selectAll("g circle")
    .data(data)
    .enter()
    .append("g")
    .append("text")
        .text(d => d.abbr)
        .attr("fill","black")

})()