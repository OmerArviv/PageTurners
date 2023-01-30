import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import { useContext, useState } from 'react';
import AuthContext from './store/auth-context'
import LoginPage from './pages/Login/LoginPage'
import AdminPage from "./pages/Admin/AdminPage";


function App() {

  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLoggedIn;
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/book/:title" element={<BookDetails />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;