import { CgProfile } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'
import './Nav.css'
export default function Nav(){


    return(
        <div className="navbar--container">
            <div className="navbar--logo">
                BrandiGram
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
                <CgProfile />
            </div>
        </div>
    )
}