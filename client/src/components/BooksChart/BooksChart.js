import * as d3 from 'd3';
import "./BooksChart.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BooksChart = () => {
    const [books, setBooks] = useState([]);
    const NUMBER_OF_SHOWN_BOOKS = 5;

    useEffect(() => {
        axios.get("http://localhost:5000/orders/getMostProfitableBooks/" + NUMBER_OF_SHOWN_BOOKS)
            .then(res => {
                setBooks(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function wrap(text, width) {
        text.each(function () {
            let text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null)
                    .append("tspan")
                    .attr("x", 0)
                    .attr("y", y)
                    .attr('text-anchor', 'middle')
                    .attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                        .attr("x", 0)
                        .attr("y", y)
                        .attr('text-anchor', 'middle')
                        .attr("dy", `${++lineNumber * lineHeight + dy}em`)
                        .text(word);
                }
            }
        });
    }

    const svg = d3.select('svg');
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(books.map((s) => s.book[0].title))
        .padding(0.4);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1000]);

    const makeYLines = () => d3.axisLeft()
        .scale(yScale);

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll("text")
        .attr('text-anchor', 'middle')
        .style("text-anchor", "end")
        .call(wrap, xScale.bandwidth());

    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        );

    const barGroups = chart.selectAll()
        .data(books)
        .enter()
        .append('g');

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.book[0].title))
        .attr('y', (g) => yScale(g.total))
        .attr('height', (g) => height - yScale(g.total))
        .attr('width', xScale.bandwidth());

    barGroups
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.book[0].title) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.total) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.total}₪`);

    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Profit');

    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 2.1)
        .attr('text-anchor', 'middle')
        .text('Books')

    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Most profitable books');

    return <div id="container">
        <svg />
    </div>
};

export default BooksChart;