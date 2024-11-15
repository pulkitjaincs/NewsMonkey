import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <div className="dropdown">
                                <button className="nav-link btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/business">Business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/">General</Link></li>
                                    <li><Link className="dropdown-item" to="/health">Health</Link></li>
                                    <li><Link className="dropdown-item" to="/science">Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                                    <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
                <Link className="nav-link mx-4" to="/about/">About</Link>
            </nav>
        </div>
    )
}
export default Navbar;