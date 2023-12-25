// Sample data - duplicates allowed, each entry has equal weight

// Flags and constants
let isPieChart = true;
const width = 1000, height = 600;
const pieRadius = 200, barWidth = 50, barSpacing = 10;

// Create a pie generator
const pie = d3.pie().value(() => 1); // Equal weight for each entry

// Create an arc generator for the donut chart
const arc = d3.arc()
    .innerRadius(120) // Radius of the hole in the center
    .outerRadius(pieRadius);



let deque = new ArrayDeque();
const data = deque.data;

// Select the SVG container and add a group element
const svg = d3.select("#mySvg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`) // Centering the chart
    .style("background-color", "#00ADB5"); // Set background color here


// Initial drawing of the donut chart
drawPieChart(); 



for(let i = 0;i < 90;i++)
{
    deque.addFront(i);
}






// Function to draw pie chart
function drawPieChart() {
    // Calculate dynamic radius based on the number of data entries
    const scaleFactor = 1.8; // Adjust this factor to control the rate of size change
    const innerRadiusFactor = 0.7
    const dynamicRadius = Math.min(width, height) / 2 - Math.min(width, height) / (2 + scaleFactor * deque.data.length);

    // Update the arc generator with the new radius
    const dynamicArc = d3.arc()
        .innerRadius(150+(innerRadiusFactor*(deque.data.length))) // Keep the inner radius static or make it dynamic as needed
        .outerRadius(dynamicRadius);

    // Fetch the latest data directly inside the function
    const currentData = pie(deque.data); 

    var paths = svg.selectAll("path")
        .data(currentData);

    paths.enter()
        .append("path")
        .merge(paths)
        .transition()
        .duration(1000)
        .attr("d", dynamicArc) // Use the dynamic arc for drawing
        .attr("stroke","black")
        .attr("fill","#EEEEEE")
        .style("cursor", "pointer");

    paths.transition()
        .duration(1000)
        .attrTween("d", function(d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return dynamicArc(interpolate(t));
            };
        });

    paths.exit()
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
            var interpolate = d3.interpolate(d, {startAngle: 0, endAngle: 0});
            return function(t) {
                return dynamicArc(interpolate(t));
            };
        })
        .remove();

    // Update labels using the new arc generator
    var labels = svg.selectAll("text")
        .data(currentData);

    labels.enter()
        .append("text")
        .merge(labels)
        .transition()
        .duration(1000)
        .attr("transform", d => `translate(${dynamicArc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data);

    labels.exit().remove();
}

