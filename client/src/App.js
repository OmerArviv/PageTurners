import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import Basket from './components/Basket';
import LoginPage from "./pages/Login/LoginPage";


function App() {
  const [CartItems, setCartItems] = useState([]);

  const onAddItem = (book) => {
    console.log("got into add item")
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
    console.log(orderData)

    setCartItems(
      CartItems.filter(x => false)
    )

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(orderData)
    }

    const response = await fetch('http://localhost:5000/books/', requestOptions);
    const data = await response.json();
    console.log(data)
  }

  return (
    <div>
      <Header></Header>
      <LoginPage />
      <PostList onAddItem={onAddItem} />
      <Basket
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        sendOrder={sendOrder}
        CartItems={CartItems} />
    </div>
  );
}

export default App;
