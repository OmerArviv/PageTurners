import * as d3 from 'd3';
import "./BooksChart.css";
import {useEffect, useState} from "react";
import axios from "axios";

const BooksChart = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/orders/")
            .then(res => {
                setBooks(getMostProfitableBooks(res.data));
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getMostProfitableBooks = (orders) => {
        const booksProfits = orders.reduce((profitableBooks, order) => {
            order.books.forEach(bookOrder => {
                const bookDetails = bookOrder.prod;
                profitableBooks[bookDetails.title] = (profitableBooks[bookDetails.title] ?? 0)
                    + bookDetails.price * bookOrder.qty
            });

            return profitableBooks;
        }, []);

        const NUMBER_OF_SHOWN_BOOKS = 5;

        const topProfitableBooks = Object.entries(booksProfits)
            .map(book => ({
                title: book[0],
                profit: book[1]
            }))
            .sort((a, b) => b.profit - a.profit)
            .slice(0, NUMBER_OF_SHOWN_BOOKS);

        return topProfitableBooks;
    };

    const svg = d3.select('svg');
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(books.map((s) => s.title))
        .padding(0.4);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1000]);

    const makeYLines = () => d3.axisLeft()
        .scale(yScale);

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

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
        .attr('x', (g) => xScale(g.title))
        .attr('y', (g) => yScale(g.profit))
        .attr('height', (g) => height - yScale(g.profit))
        .attr('width', xScale.bandwidth());

    barGroups
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.title) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.profit) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.profit}₪`);

    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Profit');

    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Books');

    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Most profitable books');

    return <div id="container">
        <svg/>
    </div>
};

export default BooksChart;