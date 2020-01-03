import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import About from './components/About.js';
import CreateAbout from './components/CreateAbout.js';
import EditAbout from './components/EditAbout.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Skills from './components/Skills.js';
import WorkHistory from './components/WorkHistory.js';
import './App.css';

const App = () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle("Tomas Perers");
    }, []);

    return (
        <Router>
            <div className="App">
                <header>
                    <div className="header-content">
                        <section className="flash">
                            <h1>{title}</h1>
                        </section>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/skills/">Skills</Link>
                            <Link to="/workhistory/">WorkHistory</Link>
                            <Link to="/login/">Login</Link>
                        </nav>
                    </div>
                </header>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/createabout" component={CreateAbout} />
                <Route exact path="/editabout" component={EditAbout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/skills" component={Skills} />
                <Route exact path="/workhistory" component={WorkHistory} />
                <footer>
                    <p className="social">
                        <a href="https://github.com/zarkroc">
                            <i className="fab fa-github fa-3x"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/tomasperers/">
                            <i className="fab fa-linkedin-in fa-3x"></i>
                        </a>
                    </p>
                    <p className="copyright">Copyright &copy; Tomas Perers 2019</p>
                </footer>
            </div>

        </Router>
    );
}


export default App;