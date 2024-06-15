import { FaSearch } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
    const [title,setTitle]=useState()

    const onTitle=(e)=>setTitle(e.target.value)

    return(
    <div className='header-section'>
        <img src='' alt="logo"/>
        <div className="input-section">
            <FaSearch fontSize={18} className="search-icon"/> 
            <input className="input-bar" placeholder="Search your Book Title" value={title} onChange={onTitle}/> 
        </div>
        <Link to="/cart"><ImCart fontSize={30} className="cart-icon"/></Link>
    </div>
)
}


export default Header;
