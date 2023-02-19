import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import { useContext, useState } from 'react';
import AuthContext from './store/auth-context'
import LoginPage from './pages/Login/LoginPage'
import AdminPage from "./pages/Admin/AdminPage";
import ErrorPage from './pages/Error/ErrorPage';
import About from './components/About';
import Footer from './components/Footer';
import UsedBooks from './pages/UsedBooks/UsedBooks';


function App() {

  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className='flex-wrapper'>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/book/:title" element={<BookDetails />} />
          {isAdmin && <Route path="/admin" element={<AdminPage />} />}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/usedBooks" element={<UsedBooks />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;