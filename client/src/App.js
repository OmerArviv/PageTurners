import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import { useContext } from 'react';
import AuthContext from './store/auth-context'
import LoginPage from './pages/Login/LoginPage'


function App() {

    const authCtx = useContext(AuthContext);
    const isLogged = authCtx.isLoggedIn;

    return (
        <Router>
            <Header></Header>
            {
                !isLogged &&
                <LoginPage />
            }
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:title" element={<BookDetails />} />
            </Routes>
        </Router>


    );
}

export default App;