let files = [
    "JSONswithStandardRanks/MergedJSONfile/merged_tree.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR1215593_Crohn's Disease.json", 
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5936079_Crohn's Disease.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5950737_Crohn's Disease.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5983330_Crohn's Disease.json", 
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5983386_Crohn's Disease.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR260506_Diarrhea.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR262943_Diarrhea.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR262958_Diarrhea.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5831593_Diarrhea.json", 
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5831595_Diarrhea.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR5831603_Diarrhea.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR478967_Healthy.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR719231_Healthy.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/ERR1190638_Healthy.json", 
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR341621_Healthy.json",  
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR6474217_Healthy.json",
    "JSONswithStandardRanks/BetterIndivJSONfiles/SRR6474279_Healthy.json"
]


let mainData
let width
let height
let radius


function innerRadius(d, index){
    if (d.depth === 7){
        return index === 0 ? 570 : 426
    }
    if (d.depth === 6){
        return index === 0 ? 455 : 334
    }
    if (d.depth === 5){
        return index === 0 ? 350 : 252
    }
    if (d.depth === 4){
        return index === 0 ? 255 : 181
    }
    if (d.depth === 3){
        return index === 0 ? 170 : 120
    }
    else if (d.depth === 2){
        return index === 0 ? 95 : 70
    }
    else if (d.depth === 1){
        return 30
    }
    // return d.y0
}


function outerRadius(d, index, csvData){
    // let nameContainsAnyValue = csvData.find(element => {
    //     return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
    // });
    // // console.log(csvData)
    // if (nameContainsAnyValue !== undefined){
    //     if (nameContainsAnyValue['feature'] === 'value'){
    //         if (d.data.hasOwnProperty('value')){
    //             return index === 0 ? 750 : 575
    //         }
    //     }
    //     else{
    //         return index === 0 ? 750 : 575
    //     }
    // }
    if (d.depth === 7){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 690 : 530
    }
    if (d.depth === 6){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 570 : 426
    }
    if (d.depth === 5){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 455 : 334
    }
    if (d.depth === 4){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 350 : 252
    }
    if (d.depth === 3){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 255 : 181
    }
    else if (d.depth === 2){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 170 : 120
    }
    else if (d.depth === 1){
        // if (!d.hasOwnProperty('children')){
        //     return 750/575
        // }
        return index === 0 ? 95 : 70
    }
    // return d.y1
}


function findNodeValueByName(node, name) {
    // console.log(node)
    if (node.data.name === name) {
        return node.value;
    }

    // If the node has children, recursively search them
    if (node.children) {
        for (let child of node.children) {
            const value = findNodeValueByName(child, name);
            if (value !== undefined) {
                return value;
            }
        }
    }
    return undefined;
}


function nameMapping(val){
    if (val === 's'){
        return "species"
    }
    else if (val === 'st'){
        return "strain"
    }
    else if (val === 'g'){
        return "genus"
    }
    else if (val === 'f'){
        return "family"
    }
    else if (val === 'o'){
        return "order"
    }
    else if (val === 'c'){
        return "class"
    }
    else if (val === 'p'){
        return "phylum"
    }
    else if (val === 'sk'){
        return "superkingdom"
    }
    return ""
}


function handleMouseOver(event, fileIndex, p, givenDataRoot, nodeName) {
    // console.log(givenDataRoot)
    // console.log(nodeName)
    // console.log(fileIndex)

    // Code on how to highlight all martching arcs ----------------------------------------------------

    // Get the ID of the hovered path
    const hoveredPathId = "path-" + p.data.name;
    // console.log('A:', hoveredPathId)

    // Select all paths with the same ID across all sunbursts
    d3.selectAll(".sunburst-path")
        .filter(function(d) {
            // Check if the current path is the hovered path or one of its descendants
            // + ", Index: " + index
            // console.log("B: ", this.id)
            return this.id === hoveredPathId 
            // || d.ancestors().some(ancestor => ancestor.data.name === p.data.name);
        })
        .style("stroke", "black")
        .style("stroke-width", 5);

    //--------------------------------------------------------------------------------------------------


    if (p.hasOwnProperty('children')){
        // console.log(p)
        let myVal
        if (fileIndex === 0){
            myVal = (p.value * 100/ 17).toFixed(6) + '%'
        }
        else{
            myVal = findNodeValueByName(givenDataRoot, nodeName)
            // console.log(myVal)
            if (myVal === undefined){
                myVal = 0 + '%'
            }
            else{
                myVal = (myVal * 100).toFixed(6) + '%'
            }
        }
        // console.log(myVal)
        // let agVal = (p.value).toFixed(6)
        let myVar = p.data.name
        let myNames = myVar.split("__")
        let index = myVar.indexOf("_")
        let substringBeforeUnderscore = ''
        if (index !== -1) {
            substringBeforeUnderscore = nameMapping(myVar.substring(0, index));
        } 

        let mytext 
        if (fileIndex === 0){
            mytext = 'Name : ' + myNames[1] + "<br>" +
            // 'Aggregated Abundance[Across 17 datasets] : ' + agVal + "<br>" +
            'Average of Relative Abundance[Across 17 datasets] : ' + myVal+ "<br>" + 
            'Rank : ' + substringBeforeUnderscore + "<br>" +
            'NCBI Taxon ID: ' + myNames[2] + "<br>"
        }
        else{
            mytext = 'Name : ' + myNames[1] + "<br>" +
            // 'Aggregated Abundance[Across 17 datasets] : ' + agVal + "<br>" +
            'Relative Abundance in this dataset : ' + myVal+ "<br>" + 
            'Rank : ' + substringBeforeUnderscore + "<br>" +
            'NCBI Taxon ID: ' + myNames[2] + "<br>"
        }

        tooltip.innerHTML = mytext
        tooltip.style.left = `${event.pageX + 5}px`; // Position tooltip next to the mouse pointer
        tooltip.style.top = `${event.pageY + 5}px`;
        tooltip.style.visibility = 'visible';
    }
    else{
        // const tooltip = document.getElementById('tooltip');
        let myVal
        if (fileIndex === 0){
            myVal = (p.value * 100/ 17).toFixed(6) + '%'
        }
        else{
            myVal = findNodeValueByName(givenDataRoot, nodeName)
            // console.log(myVal)
            if (myVal === undefined){
                myVal = 0 + '%'
            }
            else{
                myVal = (myVal * 100).toFixed(6) + '%'
            }
        }
        // let agVal = (p.value).toFixed(6)
        let myVar = p.data.name
        let myNames = myVar.split('?')

        let mytext 
        if (fileIndex === 0){
            mytext = 'Name : ' + myNames[0] + "<br>" +
            'Percentage Abundance[Across 17 datasets] : ' + myVal+ "<br>" + 
            'Rank : ' + myNames[1]+ "<br>" +
            'NCBI Taxon ID: ' + myNames[2] + "<br>"
        }
        else{
            mytext = 'Name : ' + myNames[0] + "<br>" +
            'Relative Abundance in this dataset: ' + myVal+ "<br>" + 
            'Rank : ' + myNames[1]+ "<br>" +
            'NCBI Taxon ID: ' + myNames[2] + "<br>"
        }

        tooltip.innerHTML = mytext
        tooltip.style.left = `${event.pageX + 5}px`; // Position tooltip next to the mouse pointer
        tooltip.style.top = `${event.pageY + 5}px`;
        tooltip.style.visibility = 'visible';
    }
}


// Function to handle mouseout event
function mouseout(event, p) {
    // Get the ID of the hovered path
    const hoveredPathId = "path-" + p.data.name;

    // Select all paths with the same ID across all sunbursts
    d3.selectAll(".sunburst-path")
        .filter(function(d) {
            // Check if the current path is the hovered path or one of its descendants
            return this.id === hoveredPathId || d.ancestors().some(ancestor => ancestor.data.name === p.data.name);
        })
        .style("stroke", "grey") // Reset stroke color to white
        .style("stroke-width", 1); // Reset stroke width to default

                                    
    const tooltip = document.getElementById('tooltip');
    tooltip.style.visibility = 'hidden';
}



function findTaxonCDFbyID(dataArray, taxonId) {
    const element = dataArray.find(item => item.ncbi_taxon_id === taxonId);
    return element ? element.CDF : null; // Return the taxon_rank_level if found, else return null
}

function findTaxonRAbyID(dataArray, taxonId){
    // console.log(dataArray)
    const element = dataArray.find(item => item.ncbi_taxon_id === taxonId);
    return element ? element.relative_abundance : 0; // Return the taxon_rank_level if found, else return null
}

function rendering(sliderMin, sliderMax){
    (async function () {
        sliderMin = sliderMin/100
        sliderMax = sliderMax/100
        
        console.log('Minimum Slider Value: ', sliderMin)
        console.log('Maximum Slider Value:', sliderMax)
        let myFile = 'DiarrheaIndicators' //DiarrheaIndicators
        let csvData = await d3.csv('CSVs/'+myFile+'.csv');
        // console.log(csvData);
    
        console.log('Here')
    
        for (let i = 0; i < files.length; i++) {
            // Using an IIFE (Immediately Invoked Function Expression) to create a closure
            await (async function(index) {
                let data = await d3.json(files[index]);
                if (index === 0){
                    mainData = data
                    width = 1500;
                    height = 1500;
                    radius = 100;
                }
                else{
                    width = 1150;
                    height = 1220;
                    radius = 100;
                }
    
                let containers = [
                    ".svg-container", ".svg-container-2", ".svg-container-3", 
                    '.svg-container-4', '.svg-container-5', '.svg-container-6', 
                    '.svg-container-7', '.svg-container-8', '.svg-container-9', 
                    '.svg-container-10', '.svg-container-11', '.svg-container-12', 
                    '.svg-container-13', '.svg-container-14', '.svg-container-15', 
                    '.svg-container-16', '.svg-container-17', '.svg-container-18'
                ];
    
    
    
                let svg = d3.select(containers[index]).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
                let word = (files[index]).slice(44, -5) 
                // console.log(word)
    
                if (index === 0){
                    svg.append("text")
                    .attr("x", 302)
                    .attr("y", -705)
                    .attr("font-size", "38")
                    .attr("fill", "Black")
                    // .text(myFile)
                }
                else{
                    svg.append("text")
                    .attr("x", -92)
                    .attr("y", -575)
                    .attr("font-size", "48")
                    .attr("fill", "black")
                    .text(word)
                }
                
                let partition = d3.partition()
                    .size([2 * Math.PI, radius]);
    
                let hierarchy
                if (index === 0){
                    hierarchy = d3.hierarchy(data)
                    .sum(function(d) { 
                        return d.value; 
                    })
                    .sort(function(a, b) { return b.value - a.value; });
                }
                else{
                    hierarchy = d3.hierarchy(mainData)
                    .sum(function(d) { 
                        return d.value; 
                    })
                    .sort(function(a, b) { return b.value - a.value; });
    
                    // console.log(hierarchy)
                }
    
                let root = partition(hierarchy);
    
                function calculateLeafDescendants(node) {
                    if (!node.children || node.children.length === 0) {
                        node.totalLeafDescendants = 1; // Leaf node has 1 leaf descendant (itself)
                    } else {
                        node.totalLeafDescendants = node.children.reduce(function(sum, child) {
                            return sum + calculateLeafDescendants(child);
                        }, 0);
                    }
                    return node.totalLeafDescendants;
                }
    
                // Calculate leaf descendants for each node starting from the root
                calculateLeafDescendants(root);
    
    
                root.each(function(d) {
                    if (d.children) {
                        // Calculate the total number of leaf descendants for all children
                        var totalLeafDescendants = d.children.reduce(function(sum, child) {
                            return sum + child.totalLeafDescendants;
                        }, 0);
    
                        // Iterate over the children and assign size proportional to their leaf descendants count
                        var currentAngle = d.x0;
                        d.children.forEach(function(child) {
                            var childWeight = child.totalLeafDescendants;
                            var angleRange = (childWeight / totalLeafDescendants) * (d.x1 - d.x0);
    
                            // Calculate the start and end angle for the child
                            child.x0 = currentAngle;
                            child.x1 = currentAngle + angleRange;
    
                            // Update the current angle
                            currentAngle += angleRange;
                        });
                    }
                });
    
                let givenDataRoot
                if (index !== 0){
                    givenDataRoot = d3.hierarchy(data).sum(function(d) { 
                        return d.value; 
                    })
                    .sort(function(a, b) { return b.value - a.value; });
                }
    
                let arc = d3.arc()
                .startAngle(function(d) { 
                    return d.x0; 
                })
                .endAngle(function(d) { 
                    return d.x1; 
                })
                .innerRadius(function(d) { 
                    let val = innerRadius(d, index);
                    // console.log('Y: ', d)
                    // console.log('X:', val)
                    return val; 
                })
                .outerRadius(function(d) { 
                    let val = outerRadius(d, index, csvData);
                    return val; 
                });
    
    
                // let colorScaleLow = d3.scaleLinear.domain([])
                let colorScaleLow = d3.scaleLinear()
                       .domain([0, sliderMin])
                       .range(["#0200b9", "#00fff3"]);
    
                let colorScaleHigh = d3.scaleLinear()
                .domain([sliderMax, 1])
                .range(["#ff0000", "#7b0000"]);
    
    
                let path
                if (index === 0){
                }
                else{
                    async function preLoadData(){
                        let aggregatedData = await d3.csv("CSVs/initialCSVs/AggregateFiles/"+word+"_aggregate.csv");
                        let agg2Data = await d3.csv("CSVs/CSVswithStandardRanks/"+word+".csv");
                        return [aggregatedData, agg2Data];
                    }
                    // let point35
                    preLoadData().then(aggregatedData => {
                        path = svg.selectAll("path")
                            .data(root.descendants().slice(1))
                            .enter().append("path")
                            .classed("sunburst-path", true) // Add a class to each path
                            .attr("id", (d, i) => "path-" + d.data.name) // Add a unique ID to each path
                            .attr("d", arc)
                            .style("fill", function(d) { 
                                    // console.log(computedStyle.fill)
                                    let nodeName = d.data.name
                                    let taxonID
                                    if (d.data.hasOwnProperty('children')){
                                        let lastIndex = nodeName.lastIndexOf('__')
                                        taxonID = nodeName.substring(lastIndex + 2)
                                    }
                                    else{
                                        let lastIndex = nodeName.lastIndexOf('?')
                                        taxonID = nodeName.substring(lastIndex + 1)
                                    }
                                    // console.log(taxonID)
                                    let cdf = findTaxonCDFbyID(aggregatedData[0], taxonID)
                                    // console.log(cdf)
                                    if (cdf === null){
                                        // console.log('yes')
                                        return "white"
                                    }
                                    else{
                                        if (cdf < 0){
                                            return colorScaleLow(0)
                                        }
                                        else if (cdf >= 0 && cdf < sliderMin){
                                            return colorScaleLow(cdf)
                                        }
                                        else if (cdf >= sliderMax && cdf <= 1){
                                            return colorScaleHigh(cdf)
                                        }
                                        else if (cdf > 1){
                                            return colorScaleHigh(1)
                                        }
                                        else{
                                            return "purple"
                                        }
                                    }
                            })
                            .style("stroke", function(d){
                                let nodeName = d.data.name
                                let taxonID
                                if (d.data.hasOwnProperty('children')){
                                    let lastIndex = nodeName.lastIndexOf('__')
                                    taxonID = nodeName.substring(lastIndex + 2)
                                }
                                else{
                                    let lastIndex = nodeName.lastIndexOf('?')
                                    taxonID = nodeName.substring(lastIndex + 1)
                                }
                                // console.log(taxonID)
                                let cdf = findTaxonCDFbyID(aggregatedData[0], taxonID)
                                // console.log(cdf)
                                if (cdf === null){
                                    // console.log('yes')
                                    return "grey"
                                }
                                else{
                                    return "black"
                                }
                                // return "black"
                            })
                            .style("opacity", function(d){
                                let nodeName = d.data.name
                                let taxonID
                                if (d.data.hasOwnProperty('children')){
                                    let lastIndex = nodeName.lastIndexOf('__')
                                    taxonID = nodeName.substring(lastIndex + 2)
                                }
                                else{
                                    let lastIndex = nodeName.lastIndexOf('?')
                                    taxonID = nodeName.substring(lastIndex + 1)
                                }
                                // console.log(taxonID)
                                let cdf = findTaxonCDFbyID(aggregatedData[0], taxonID)
                                // console.log(cdf)
                                if (cdf === null){
                                    // console.log('yes')
                                    return "0.1"
                                }
                                else{
                                    return "1"
                                }
                                // return "1"
                            }) 
                            .style("stroke-width", "1")
                            .on("mouseover", function (event, d){
                                let nodeName = d.data.name
                                handleMouseOver(event, index, d, givenDataRoot, nodeName)
                            })
                            .on("mouseout", mouseout);
                    })
    
                    
                }
    
            })(i);
        }
    })();
}

let sliderSVG = d3.select('.slider').append("svg")
                    .attr("width", 1150)
                    .attr("height", 200)
                    .append("g")
                    .attr("transform", "translate(" + 0 + "," + 0 + ")");



const x = d3.scaleLinear()
    .domain([0, 100])
    .range([100, 1050])
    .clamp(true);

sliderSVG.append('text')
    .attr('class', 'slider-value')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${x(35)}, ${160})`)
    .attr("font-size", "48")
    .text("35");

sliderSVG.append('text')
    .attr('class', 'slider-value')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${x(65)}, ${160})`)
    .attr("font-size", "48")
    .text("65");

const slider = sliderSVG.append('g')
    .attr('class', 'slider')
    .attr('transform', `translate(0, ${100})`);

slider.append('line')
    .attr('class', 'track')
    .attr('x1', x.range()[0])
    .attr('x2', x.range()[1]);

slider.append('line')
    .attr('class', 'track-inset')
    .attr('x1', x.range()[0])
    .attr('x2', x.range()[1]);

slider.append('line')
    .attr('class', 'track-overlay')
    .attr('x1', x.range()[0])
    .attr('x2', x.range()[1])
    .call(d3.drag()
        .on('start.interrupt', () => slider.interrupt())
        .on('start drag', function(event) {
            const xPos = x.invert(event.x);
            if (draggingMin) {
                minValue = Math.min(xPos, maxValue);
                handleMin.attr('cx', x(minValue));
            } else {
                maxValue = Math.max(xPos, minValue);
                handleMax.attr('cx', x(maxValue));
            }
            // updateValues();
        })
        .on('end', () => {
            // draggingMin = false;
            updateValues();
        }));


let minValue = 35;
let maxValue = 65;
let draggingMin = true;

const handleMin = slider.append('circle')
    .attr('class', 'handle')
    .attr('r', 18)
    .attr('cx', x(minValue))
    .call(d3.drag()
        .on('start', () => draggingMin = true)
        .on('drag', function(event) {
            minValue = Math.min(x.invert(event.x), maxValue);
            d3.select(this).attr('cx', x(minValue));
        })
        .on('end', () => {
            draggingMin = false;
            updateValues();
        }));

const handleMax = slider.append('circle')
    .attr('class', 'handle')
    .attr('r', 18)
    .attr('cx', x(maxValue))
    .call(d3.drag()
        .on('start', () => draggingMin = false)
        .on('drag', function(event) {
            maxValue = Math.max(x.invert(event.x), minValue);
            d3.select(this).attr('cx', x(maxValue));
        })
        .on('end', () => {
            draggingMin = false;
            updateValues();
        }));

function updateValues() {
    sliderSVG.selectAll('.slider-value').remove();

    sliderSVG.append('text')
        .attr('class', 'slider-value')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${x(minValue)}, ${160})`)
        .attr("font-size", "48")
        .text(minValue.toFixed(2));

    sliderSVG.append('text')
        .attr('class', 'slider-value')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${x(maxValue)}, ${160})`)
        .attr("font-size", "48")
        .text(maxValue.toFixed(2));

    // Select all elements with the class 'your-class-name'
    const elements = document.querySelector('.svg-container')
    elements.innerHTML = ''
    const elements2 = document.querySelector('.svg-container-2');
    elements2.innerHTML = ''
    const elements3 = document.querySelector('.svg-container-3');
    elements3.innerHTML = ''
    const elements4 = document.querySelector('.svg-container-4');
    elements4.innerHTML = ''
    const elements5 = document.querySelector('.svg-container-5');
    elements5.innerHTML = ''
    const elements6 = document.querySelector('.svg-container-6');
    elements6.innerHTML = ''
    

    const elements7 = document.querySelector('.svg-container-7');
    elements7.innerHTML = ''
    const elements8 = document.querySelector('.svg-container-8');
    elements8.innerHTML = ''
    const elements9 = document.querySelector('.svg-container-9');
    elements9.innerHTML = ''
    const elements10 = document.querySelector('.svg-container-10');
    elements10.innerHTML = ''
    const elements11 = document.querySelector('.svg-container-11');
    elements11.innerHTML = ''
    const elements12 = document.querySelector('.svg-container-12');
    elements12.innerHTML = ''

    const elements13 = document.querySelector('.svg-container-13');
    elements13.innerHTML = ''
    const elements14 = document.querySelector('.svg-container-14');
    elements14.innerHTML = ''
    const elements15 = document.querySelector('.svg-container-15');
    elements15.innerHTML = ''
    const elements16 = document.querySelector('.svg-container-16');
    elements16.innerHTML = ''
    const elements17 = document.querySelector('.svg-container-17');
    elements17.innerHTML = ''
    const elements18 = document.querySelector('.svg-container-18');
    elements18.innerHTML = ''
    // console.log('X:', elements2)

    // elements.forEach(element => {
    //     element.innerHTML = '';
    // });
    // // Iterate over each element and remove it from the DOM
    // elements2.forEach(element => {
    //     element.innerHTML = '';
    // });

    
    rendering(minValue, maxValue)
}

rendering(35, 65)









