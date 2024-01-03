// Flags and constants
const width = 1000, height = 800;
const pieRadius = 200, barWidth = 50, barSpacing = 10;

// Create a pie generator
const pie = d3.pie().value(() => 1); // Equal weight for each entry

let deque = new ArrayDeque();

// Select the SVG container and add a group element
const svg = d3.select("#mySvg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`); // Centering the chart
 
// // Populate the deque with random data
// for (let i = 0; i < 126; i++) {
//     deque.addFront(Math.floor(Math.random() * 50));
// }

// Function to calculate dynamic radii
function calculateRadii(length) {
    const scaleFactor = 10;
    const maxInnerRadius = 400;
    const dynamicOuterRadius = Math.min(width, height) / 2 - Math.min(width, height) / (2 + scaleFactor * length);
    const dynamicInnerRadius = Math.min(maxInnerRadius, dynamicOuterRadius / 1.5);
    return { dynamicOuterRadius, dynamicInnerRadius };
}

// Function to draw pie chart
function drawPieChart() {
    const { dynamicOuterRadius, dynamicInnerRadius } = calculateRadii(deque.data.length);
    const fontSize = 18 - Math.min(5, deque.data.length / 5);

    const dynamicArc = d3.arc()
        .innerRadius(dynamicInnerRadius)
        .outerRadius(dynamicOuterRadius);

    const currentData = pie(deque.data);
    const paths = svg.selectAll("path")
        .data(currentData);

    paths.enter()
        .append("path")
        .merge(paths)
        .attr("d", dynamicArc)
        .attr("stroke", "black")
        .attr("fill", (d, i) => deque.colours[i % deque.colours.length])
        .style("cursor", "pointer")
        .on("click", showTooltip)
        .on("mouseout", function() {
            setTimeout(() => {
                if (!isMouseOnTooltip) {
                    hideTooltip();
                }
            }, 100);
        });

    paths.exit().remove();

    drawLabels(currentData, dynamicInnerRadius, dynamicOuterRadius, fontSize);
}

function drawLabels(data, innerRadius, outerRadius, fontSize) {
    const labelArc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const labels = svg.selectAll("text")
        .data(data);

    labels.enter()
        .append("text")
        .merge(labels)
        .transition()
        .duration(1000)
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data)
        .style("font-size", `${fontSize}px`);

    labels.exit().remove();
}



let isMouseOnTooltip = false; // Flag to track mouse presence on the tooltip

// Function to show tooltip
function showTooltip(event, d) {
    const tooltip = d3.select("#tooltip");
    tooltip.style("visibility", "visible")
        .html("Data: " + d.data)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .on("mouseover", function () {
            isMouseOnTooltip = true; // Mouse is over the tooltip
        })
        .on("mouseout", function () {
            isMouseOnTooltip = false; // Mouse left the tooltip
            hideTooltip();
        });
}

// Function to hide tooltip
function hideTooltip() {
    if (!isMouseOnTooltip) { // Hide only if mouse is not on the tooltip
        const tooltip = d3.select("#tooltip");
        tooltip.style("visibility", "hidden");
    }
}

// Adjust the zoom behavior and event handler
const zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on("zoom", zoomed);

// Apply zoom behavior to the SVG, not the rectangle
d3.select("#mySvg").call(zoom);

// Zoom and pan event handler
function zoomed(event) {
    // Apply the zoom transformation to the group element
    svg.attr("transform", event.transform);
}

// Initial drawing of the pie chart
drawPieChart();


document.addEventListener('DOMContentLoaded', function() {
    var addFrontButton = document.getElementById('add-btn');
    addFrontButton.addEventListener('click', function() {
        var elementInput = document.getElementById('element-input').value;
        addElementToFront(elementInput);
    });
});

function addElementToFront(element) {
    console.log("Added to front:", element);
    deque.addFront(element);
    drawPieChart();
}
