import React from 'react'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const StockChart = ({data}) => {
    //const svg = d3.select('svg')
    const svgRef = useRef()

    useEffect(() => {
        //setting up the svg
        const w = 800;
        const h = 400;
        const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('background', '#d3d3')
        .style('margin-top', '50')
        .style('overflow', 'visible');
  
        //  setting the scaling 
        const xScale = d3.scaleLinear()
        .domain([0, data.length -1])
        .range([0,w]);
  
        const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h,0]);
  
        const generateScaledLine = d3.line()
        .x((d,i) => xScale(i))
        .y(yScale)
        .curve(d3.curveLinear);

        //  setting the axes
        const xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(i=> i+1);
  
        const yAxis = d3.axisLeft(yScale)
        .ticks(5);
  
        svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`);
        svg.append('g')
        .call(yAxis);
  
        //  setting up the data for the svg
        svg.selectAll('.line')
        .data([data])
        .join('path')
        .attr('d', d => generateScaledLine(d))
        .attr('fill', "none")
        .attr('stroke', 'steelblue')
        .attr("stroke-width","2.5");
        }, [data]) 
  
  return (
    <div> 
        <h2>StockChart</h2>
        <svg ref = {svgRef}> </svg>
    </div>
  )
}

export default StockChart