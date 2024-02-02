let list=new LinkedList();
function drawLinkedList(listData) {
   d3.select("body").selectAll("svg").remove();
   const width = 500;
   const height = 500;
   const radius = Math.min(width, height) / 2 - 40; // Radius of the whole layout
   const nodeRadius = 15; // Radius of each node

   // Create SVG canvas
   const svg = d3.select("body").append("svg")
                 .attr("width", width)
                 .attr("height", height)
                 .append("g")
                 .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   // Calculate circular positions for each node
   const angleStep = (2 * Math.PI) / listData.length;
   listData.forEach((d, i) => {
       d.x = radius * Math.cos(i * angleStep - Math.PI / 2); // Adjust for starting at top
       d.y = radius * Math.sin(i * angleStep - Math.PI / 2);
   });

   // Draw nodes
   svg.selectAll(".node")
      .data(listData)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", nodeRadius)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.data === null ? "grey" : "white");

   // Draw links
   svg.selectAll(".link")
      .data(listData)
      .enter().append("line")
      .attr("class", "link")
      .attr("x1", (d, i) => i > 0 ? listData[i - 1].x : listData[listData.length - 1].x) // Previous node's x
      .attr("y1", (d, i) => i > 0 ? listData[i - 1].y : listData[listData.length - 1].y) // Previous node's y
      .attr("x2", d => d.x) // Current node's x
      .attr("y2", d => d.y) // Current node's y
      .attr("stroke", "white");
}
function addNodeToList() {
   const newNodeValue = document.getElementById('newNodeValue').value;
   if (newNodeValue) {
       list.add(list.size(), newNodeValue); // Add the new node to the list
       const updatedListData = list.toArray(); // Convert the updated list to an array
       drawLinkedList(updatedListData); // Redraw the list with the new node
   }
}

document.getElementById("addNodeButton").addEventListener("click", addNodeToList);

// Initial drawing of the list
const initialListData = list.toArray();
drawLinkedList(initialListData);
