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
    return element ? element.CDF : 0; // Return the taxon_rank_level if found, else return null
}

function findTaxonRAbyID(dataArray, taxonId){
    // console.log(dataArray)
    const element = dataArray.find(item => item.ncbi_taxon_id === taxonId);
    return element ? element.relative_abundance : 0; // Return the taxon_rank_level if found, else return null
}





(async function() {
    let myFile = 'DiarrheaIndicators' //DiarrheaIndicators
    let csvData = await d3.csv('CSVs/'+myFile+'.csv');
    console.log(csvData);


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

            // console.log(index);
            // console.log('-------------------------------------------------')
            // console.log(files[index]);
            // console.log(mainData)
            // console.log(data)



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
                .text(myFile)
            }
            else{
                svg.append("text")
                .attr("x", -52)
                .attr("y", -585)
                .attr("font-size", "28")
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
            

            

            // accounting for CDF only

            // const lowAbundanceLow = d3.scaleLinear().domain([0, 0.5]) .range(["#191970", "#6495ED"])
            // const lowAbundanceHigh = d3.scaleLinear().domain([0.5, 1]) .range(["#6495ED", "#87CEFA"])
            // const highAbundanceLow = d3.scaleLinear().domain([0, 0.5]) .range(["#FFA07A", "#CD5C5C"])
            // const highAbundanceHigh = d3.scaleLinear().domain([0.5, 1]) .range(["#CD5C5C", "#8B0000"])

            //accounting for CDF and weight -- Crohn
            const sqrtScaleLAC = d3.scaleSqrt().domain([0.00134, 0.4431]).range([0, 1]);
            const sqrtScaleHAC = d3.scaleSqrt().domain([0, 0.8053]).range([0,1])
            const lowAbundanceCrohn = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);
            const highAbundanceCrohn = d3.scaleSequential(d3.interpolateReds).domain([0, 1]);

            //accounting for CDF and weight -- Diarrhea -- Linear
            // const lowAbundanceDiarrhea = d3.scaleLinear().domain([0, 0.1342]) .range(["#87CEFA", "#191970"])
            // const highAbundanceDiarrhea = d3.scaleLinear().domain([0, 0.2325]) .range(["#FFA07A", "#8B0000"])


            //accounting for CDF and weight -- Diarrhea
            const sqrtScaleLAD = d3.scaleSqrt().domain([0, 0.1342]).range([0, 1]);
            const sqrtScaleHAD = d3.scaleSqrt().domain([0, 0.2325]).range([0,1])
            const lowAbundanceDiarrhea = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);
            const highAbundanceDirrahea = d3.scaleSequential(d3.interpolateReds).domain([0, 1]);


            let path
            // let currentParent
            // let stripedArc

            // let counter = 0
            if (index === 0){
                path = svg.selectAll("path")
                .data(root.descendants().slice(1))
                .enter().append("path")
                .classed("sunburst-path", true) // Add a class to each path
                .attr("id", (d, j) => "path-" + d.data.name) // Add a unique ID to each path
                .attr("d", arc)
                .style("fill", function(d) { 
                    let nameContainsAnyValue = csvData.find(element => {
                        return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
                    });
                    if (nameContainsAnyValue !== undefined){
                        if (nameContainsAnyValue['feature'] === 'value'){
                            if (d.data.hasOwnProperty('children')){
                                return "white"
                            }
                            else if (d.data.hasOwnProperty('value')){
                                if (nameContainsAnyValue['weight'] >= 0){
                                    return "#CD5C5C"
                                }
                                else{
                                    return "#6495ED"
                                }
                            }
                        }
                        else{
                            // console.log(nameContainsAnyValue)
                            if (nameContainsAnyValue['weight'] >= 0){
                                return "#CD5C5C"
                            }
                            else{
                                return "#6495ED"
                            }
                        }
                    }
                    else{
                        return "white"
                    }
                })
                .style("stroke", function(d){
                    let nameContainsAnyValue = csvData.find(element => {
                        return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
                    });
                    if (nameContainsAnyValue !== undefined){
                        if (nameContainsAnyValue['feature'] === 'value'){
                            if (d.data.hasOwnProperty('children')){
                                return "grey"
                            }
                            else if (d.data.hasOwnProperty('value')){
                                return "black"
                            }
                        }
                        else{
                            return "black"
                        }
                    }
                    else{
                        return "grey"
                    }
                })         
                .style("opacity", function(d){
                    let nameContainsAnyValue = csvData.find(element => {
                        return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
                    });
                    if (nameContainsAnyValue !== undefined){
                        if (nameContainsAnyValue['feature'] === 'value'){
                            if (d.data.hasOwnProperty('children')){
                                return "0.1"
                            }
                            else if (d.data.hasOwnProperty('value')){
                                return "1"
                            }
                        }
                        else{
                            return "1"
                        }
                    }
                    else{
                        return "0.1"
                    }
                })  
                .style("stroke-width", function(d){
                    let nameContainsAnyValue = csvData.find(element => {
                        return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
                    });
                    if (nameContainsAnyValue !== undefined){
                        if (nameContainsAnyValue['feature'] === 'value'){
                            if (d.data.hasOwnProperty('children')){
                                return "1"
                            }
                            else if (d.data.hasOwnProperty('value')){
                                return "1"
                            }
                        }
                        else{
                            return "1"
                        }
                    }
                    else{
                        return "1"
                    }
                })  
                // .on("mouseover", function (event, d){
                //     handleMouseOver(event, index, d, null, null)
                // })
                // .on("mouseout", mouseout)
                // .on("click", click)

                svg.append("circle")
                .attr("r", 30)
                .attr("class", "center")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .style("fill", "white")
                // .on("click", () => click(null, currentParent));

                // currentParent = root;

                // stripedArc = null; // Track the currently striped arc
            }
            else{

                async function preLoadData(){
                    let aggregatedData = await d3.csv("CSVs/initialCSVs/AggregateFiles/"+word+"_aggregate.csv");
                    let agg2Data = await d3.csv("CSVs/CSVswithStandardRanks/"+word+".csv");
                    return [aggregatedData, agg2Data];
                }

                preLoadData().then(aggregatedData => {
                    path = svg.selectAll("path")
                        .data(root.descendants().slice(1))
                        .enter().append("path")
                        .classed("sunburst-path", true) // Add a class to each path
                        .attr("id", (d, i) => "path-" + d.data.name) // Add a unique ID to each path
                        .attr("d", arc)
                        .style("fill", function(d) { 


                            let pathString = "path-" + d.data.name
                            let pathElement = document.getElementById(pathString)

                            let computedStyle = window.getComputedStyle(pathElement)
                            if (computedStyle.fill !== 'rgb(255, 255, 255)'){
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

                                let cdf = findTaxonCDFbyID(aggregatedData[0], taxonID)
                                // console.log(cdf)
                                let nameContainsAnyValue = csvData.find(element => {
                                    return d.data.name.includes(element['organism']) && d.data.name.includes(element['ncbi_taxon_id'])
                                });
                                // console.log(nameContainsAnyValue)
                                // console.log(nameContainsAnyValue.weight)
                                // console.log('Val: ', cdf * nameContainsAnyValue.weight)
                                // if (nameContainsAnyValue.weight > 0){
                                // }
                                // else{
                                // }

                                if (computedStyle.fill === 'rgb(205, 92, 92)'){
                                    let colorVal = cdf * nameContainsAnyValue.weight
                                    // console.log('X:', cdf)
                                    // console.log('Y:', d.data)
                                    // console.log('Z:', nameContainsAnyValue.weight)
                                    // console.log('A: ', cdf * nameContainsAnyValue.weight)
                                    // console.log('------------')

                                    // if (colorVal >= 0.40265){
                                    //     return highAbundanceHigh(colorVal)
                                    // }
                                    // else{
                                    //     return highAbundanceLow(colorVal)
                                    // }
                                    return highAbundanceDirrahea(sqrtScaleHAD(colorVal))

                                    // return highAbundanceCrohn(sqrtScaleHAC(colorVal))
                                    // return highAbundanceDiarrhea(colorVal)
                                }
                                else{
                                    
                                    // console.log('X:', cdf)
                                    // console.log('Y:', d.data)
                                    // console.log('Z:', nameContainsAnyValue.weight)
                                    // console.log('B: ', (1 - cdf) * nameContainsAnyValue.weight * -1)
                                    // console.log('X:', 1 - cdf)
                                    // console.log('Y:', d.data)
                                    // console.log('Z:', nameContainsAnyValue.weight)
                                    // console.log('B: ', (1 - cdf) * nameContainsAnyValue.weight * -1)
                                    // console.log('------------')

                                    // if (cdf >= 0.5){
                                    //     return lowAbundanceHigh(cdf)
                                    // }
                                    // else{
                                    //     return lowAbundanceLow(cdf)
                                    // }
                                    let colorVal = (1 - cdf) * nameContainsAnyValue.weight * -1
                                    return lowAbundanceDiarrhea(sqrtScaleLAD(colorVal))

                                    // return lowAbundanceCrohn(sqrtScaleLAC(colorVal))
                                    // return lowAbundanceDiarrhea(colorVal)

                                }
                            }
                            else{
                                // let nodeName = d.data.name
                                // let taxonID
                                // if (d.data.hasOwnProperty('children')){
                                //     let lastIndex = nodeName.lastIndexOf('__')
                                //     taxonID = nodeName.substring(lastIndex + 2)
                                // }
                                // else{
                                //     let lastIndex = nodeName.lastIndexOf('?')
                                //     taxonID = nodeName.substring(lastIndex + 1)
                                // }
                                // // console.log(data)
                                // let rabundance = findTaxonRAbyID(aggregatedData[1], taxonID)
                                
                                
                                // if (rabundance === 0){
                                //     // console.log('zero')
                                //     return "black"
                                // }
                                // else{
                                //     // console.log('yes')
                                    
                                //     console.log('ID:', taxonID)
                                //     console.log('Abundance:', rabundance)
                                //     return "white"
                                // }
                                return "white"
                                // console.log(d.data.name)
                            }
                        })
                        .style("stroke", function(d){
                            let pathString = "path-" + d.data.name
                            let pathElement = document.getElementById(pathString)
                            let computedStyle = window.getComputedStyle(pathElement)
                            if (computedStyle.fill !== 'rgb(255, 255, 255)'){
                                return "black"
                            }
                            else{
                                return "grey"
                            }
                        })
                        .style("opacity", function(d){
                            let pathString = "path-" + d.data.name
                            let pathElement = document.getElementById(pathString)
                            let computedStyle = window.getComputedStyle(pathElement)
                            if (computedStyle.fill !== 'rgb(255, 255, 255)'){
                                return "1"
                            }
                            else{
                                return "0.1"
                            }
                        }) 
                        .style("stroke-width", "1")
                        // .on("mouseover", function (event, d){
                        //     let nodeName = d.data.name
                        //     handleMouseOver(event, index, d, givenDataRoot, nodeName)
                        // })
                        // .on("mouseout", mouseout);


                        // hierarchy.sort(function(a, b) {
                        //     let pathString = "path-" + a.data.name
                        //     let pathElement = document.getElementById(pathString)
                        //     let computedStyle = window.getComputedStyle(pathElement)
                        //     console.log(computedStyle.fill)
                        //     let pathString2 = "path-" + b.data.name
                        //     let pathElement2 = document.getElementById(pathString2)
                        //     let computedStyle2 = window.getComputedStyle(pathElement2)
                        //     console.log(computedStyle2.fill)
                        //     if (aColor === 'rgb(255, 255, 255)' && bColor !== 'rgb(255, 255, 255)') return 1;
                        //     if (aColor !== 'rgb(255, 255, 255)' && bColor === 'rgb(255, 255, 255)') return -1;
                        //     return 0;
                        // });
                })

                
            }

            // function click(event, p) {
            //     console.log('here')
            //     if (p.hasOwnProperty('children')) {
            //         currentParent = p.parent || root;
            
            //         root.each(d => d.target = {
            //             x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            //             x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            //             y0: Math.max(0, innerRadius(d) - p.depth),
            //             y1: Math.max(0, outerRadius(d, index, csvData) - p.depth)
            //         });
            
            //         const t = svg.transition().duration(750);
            
            //         path.transition(t)
            //             .tween("data", d => {
            //                 const i = d3.interpolate(d.current, d.target);
            //                 return t => d.current = i(t);
            //             })
            //             .attrTween("d", d => () => arc(d.current));
            
            //         // Restore original color of the previously striped arc
            //         if (stripedArc) {
            //             d3.select(stripedArc).attr("fill", originalColors[stripedArc.id]);
            //         }
            
            //         // Store original color of the clicked arc
            //         originalColors[event.target.id] = event.target.getAttribute("fill");
            
            //         // Apply striped pattern to the clicked arc
            //         d3.select(event.target)
            //             .attr("fill", "url(#stripes)");
            
            //         // Update the currently striped arc
            //         stripedArc = event.target;
            //     }
            // }

            // root.each(d => d.current = d);


            // console.log(counter)

        })(i);
    }
})();
