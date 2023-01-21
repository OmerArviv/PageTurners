import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import { useContext } from 'react';
import AuthContext from './store/auth-context'
import LoginPage from './pages/Login/LoginPage'
import AdminPage from "./pages/Admin/AdminPage";


function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:title" element={<BookDetails />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>


  );
}

export default App;