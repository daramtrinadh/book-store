// components/Header/index.js
import { ImCart } from "react-icons/im";
import { Link, withRouter } from 'react-router-dom';
import './index.css';

const Header = () =>  (
        <div className='header-section'>
            <Link to="/"><img src='path_to_logo' alt="logo" /></Link>
            <Link to="/cart"><ImCart fontSize={30} className="cart-icon" /></Link>
        </div>
    );

export default withRouter(Header);
