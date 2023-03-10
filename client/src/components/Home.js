import React from 'react'
import { useState, useContext, useEffect } from 'react'
import PostList from './PostList';
import Basket from './Basket';
import AuthContext from '../store/auth-context';
import './Home.css';

function Home() {

    const [CartItems, setCartItems] = useState([]);
    const authCtx = useContext(AuthContext);

    const onAddItem = (book) => {
        const exist = CartItems.find((x) => x.title === book.title);
        if (exist) {
            setCartItems(
                CartItems.map((x) =>
                    x.title === book.title ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...CartItems, { ...book, qty: 1 }]);
        }
    }

    const onRemoveItem = (book) => {
        const exist = CartItems.find(x => x.title === book.title)
        if (exist.qty === 1) {
            setCartItems(CartItems.filter(x => x.title !== book.title))
        } else {
            setCartItems(CartItems.map(x =>
                x.title === book.title ? { ...exist, qty: exist.qty - 1 } : x
            ))
        }
    }

    const sendOrder = async () => {
        const orderData = await CartItems.map(item => JSON.stringify(item))

        setCartItems(
            CartItems.filter(x => false)
        )

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }

        fetch("http://localhost:5000/users/getUser/" + authCtx.email, requestOptions).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Auth failed';

                    throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({
                    orderData: orderData,
                    user: data
                })
            }

            fetch('http://localhost:5000/orders/', requestOptions);
        }).catch(err => {
            alert(err.message);
        });
    }

    useEffect(() => {
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems !== "[]") {
            setCartItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    return (
        <div className="main-container">
            <PostList onAddItem={onAddItem} />
            <Basket
                onRemoveItem={onRemoveItem}
                onAddItem={onAddItem}
                sendOrder={sendOrder}
                CartItems={CartItems} />
        </div>
    )
}


export default Home
