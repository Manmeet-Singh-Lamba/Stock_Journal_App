import React from 'react'
import { useState, useEffect } from 'react'
//import { useRef } from 'react'
//import * as d3 from 'd3'
import Plot from 'react-plotly.js';

const StockChart = ({ticker_symbol}) => {
  const [stockChartXValues, setStockChartXValues] = useState([])
  const [stockChartYValues, setStockChartYValues] = useState([])

  useEffect(() =>{
    const fetchStock = async() =>{
      let API_call = `http://localhost:5000/stockchart/${ticker_symbol}`
      let XValues =[]
      let YValues = []
      fetch(API_call)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        for (var key in data["Time Series (Daily)"]){
          XValues.push(key)
          YValues.push(data["Time Series (Daily)"][key]['4. close'])
        }
        setStockChartXValues(XValues)
        setStockChartYValues(YValues)
        //console.log(stockChartXValues)
        //console.log(stockChartYValues)
        
      })
      
    }

    fetchStock()
  },[ticker_symbol])


    return (
    <div> 
        <h2>StockChart</h2>
        <Plot

          data={[

            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines',
              marker: {color: 'steelBlue'},
            },

            // {
            //   type: 'scatter', 
            //   x: [1, 2, 3], 
            //   y: [2, 5, 3],
            //   mode: 'lines+markers',
            //   marker: {color: 'blue'},
            // },
          ]}

        layout={ {width: window.innerWidth-200 , height: 440, title: `${ticker_symbol}`} }

      />

    </div>
  )
}
// {
//     //const svg = d3.select('svg')
//     const svgRef = useRef()

//     useEffect(() => {
//         //setting up the svg
//         const w = 800;
//         const h = 400;
//         const svg = d3.select(svgRef.current)
//         .attr('width', w)
//         .attr('height', h)
//         .style('background', '#d3d3')
//         .style('margin-top', '50')
//         .style('overflow', 'visible');
  
//         //  setting the scaling 
//         const xScale = d3.scaleLinear()
//         .domain([0, data.length -1])
//         .range([0,w]);
  
//         const yScale = d3.scaleLinear()
//         .domain([0, h])
//         .range([h,0]);
  
//         const generateScaledLine = d3.line()
//         .x((d,i) => xScale(i))
//         .y(yScale)
//         .curve(d3.curveLinear);

//         //  setting the axes
//         const xAxis = d3.axisBottom(xScale)
//         .ticks(data.length)
//         .tickFormat(i=> i+1);
  
//         const yAxis = d3.axisLeft(yScale)
//         .ticks(5);
  
//         svg.append('g')
//         .call(xAxis)
//         .attr('transform', `translate(0, ${h})`);
//         svg.append('g')
//         .call(yAxis);
  
//         //  setting up the data for the svg
//         svg.selectAll('.line')
//         .data([data])
//         .join('path')
//         .attr('d', d => generateScaledLine(d))
//         .attr('fill', "none")
//         .attr('stroke', 'steelblue')
//         .attr("stroke-width","2.5");
//         }, [data]) 
  
//   return (
//     <div> 
//         <h2>StockChart</h2>
//         <svg ref = {svgRef}> </svg>
//     </div>
//   )
// }

export default StockChart