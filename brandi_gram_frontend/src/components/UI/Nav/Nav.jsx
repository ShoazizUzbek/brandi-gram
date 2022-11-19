import { CgProfile } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'
import './Nav.css';
import { Link } from "react-router-dom";

export default function Nav(){


    return(
        <div className="navbar--container">
            <div className="navbar--logo">
                <Link to={'/'} style={{textDecoration: 'none', color: 'black'}}>
                    BrandiGram
                </Link>
            </div>
            <div className="navbar-search-icon">
            <div class="wrap">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                    <button type="submit" class="searchButton">
                        <FaSearch />
                    </button>
                </div>
                </div>
            </div>
            <div className="profile">
                <Link to={localStorage.getItem('token') ? '' : '/authentification'} style={{textDecoration: 'none', color: 'black'}}>
                    <CgProfile />
                </Link>
            </div>
        </div>
    )
}