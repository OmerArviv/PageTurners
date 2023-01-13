import React, { Component } from 'react'
import axios from 'axios'
import Book from './Book'
import './PostList.css';

class PostList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                this.setState({ posts: res.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { posts } = this.state
        const { onAddItem } = this.props

        return (
            <div className='container'>
                {
                    posts.length ?
                        posts.map(post =>
                            <div key={post.title} className="ListItem">
                                <Book
                                    book={post}
                                    onAddItem={onAddItem}
                                />
                            </div>
                        ) :
                        null
                }
            </div>
        )
    }
}

export default PostList

