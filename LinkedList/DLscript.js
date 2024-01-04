function drawLinkedList(listData) {
    const width = 500;
    const height = 100;
    const nodeRadius = 20;

    // Create SVG canvas
    const svg = d3.select("body").append("svg")
                  .attr("width", width)
                  .attr("height", height);

    // Draw nodes
    svg.selectAll(".node")
       .data(listData)
       .enter().append("circle")
       .attr("class", "node")
       .attr("r", nodeRadius)
       .attr("cx", (d, i) => i * nodeRadius * 3)
       .attr("cy", height / 2)
       .attr("fill", "white");  // Set node color to white


    // Draw links
    svg.selectAll(".link")
       .data(listData.slice(1)) // Exclude the first node to avoid going out of bounds
       .enter().append("line")
       .attr("class", "link")
       .attr("x1", (d, i) => i * nodeRadius * 3 + nodeRadius)
       .attr("y1", height / 2)
       .attr("x2", (d, i) => (i + 1) * nodeRadius * 3)
       .attr("y2", height / 2)
       .attr("stroke", "white");
}

// Example usage
const listData = [{value: 'Node 1'}, {value: 'Node 2'}, {value: 'Node 3'}];
drawLinkedList(listData);
