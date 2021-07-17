import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { FaMandalorian } from "react-icons/fa";
import {
  useHistory
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {getCurrentUser, getCurrentToken, clearCurrentToken, clearCurrentUser, clearCurrentCart} from '../auth'

const Navigation = (props) => {


  const {token, setToken, user, setUser, setOrders} = props;
  const history = useHistory();


  const handleLogout = () => {
    clearCurrentUser();
    clearCurrentToken();
    clearCurrentCart();
    setOrders([])
    setUser({});
    setToken('');
    history.push('/users/login');
  }

  useEffect(() => {
    if(!token) {
        const theToken = localStorage.getItem('token');
        setUser(getCurrentUser())
        setToken(theToken);
    }
  }, []);

    return <div><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <NavLink to="/home">
      <Navbar.Brand>Codalorians {<FaMandalorian/>}</Navbar.Brand>
    </NavLink>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products">All Products</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/guitar">Guitars</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/bass">Basses</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/microphones">Microphones</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/effectpedals">Effect Pedals</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/piano">Pianos & Keyboards</Link>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products/category/drums">DrumKits</Link>
{user && user.isadmin ? 
        <NavDropdown title="Admin Tools" id="collasible-nav-dropdown">
          {user && user.isadmin ? <NavDropdown.Item>
            <Nav.Link>
              <NavLink to="/users">
                Registered Users
                </NavLink>
            </Nav.Link></NavDropdown.Item> : <NavDropdown.Item>Action</NavDropdown.Item> }

              {user && user.isadmin ? <NavDropdown.Item>
                <Nav.Link>
              <NavLink to="/users/add">
                Add Users
                </NavLink>
            </Nav.Link></NavDropdown.Item> : <NavDropdown.Item>Another Action</NavDropdown.Item> }

              {user && user.isadmin ? <NavDropdown.Item>
                <Nav.Link>
              <NavLink to="/orders">
                All Orders
              </NavLink>
        </Nav.Link></NavDropdown.Item> : <NavDropdown.Item>Another Action</NavDropdown.Item> }

              {user && user.isadmin ? <NavDropdown.Item>
                <Nav.Link>
              <NavLink to="/products">
                Edit Products
              </NavLink>
        </Nav.Link></NavDropdown.Item> : <NavDropdown.Item>Another Action</NavDropdown.Item> }

        </NavDropdown>
         : null}

      </Nav>
      <Nav>

      { !token
      ? <>
      <Nav.Link>
      <NavLink to="/users/login"><Navbar.Brand>Login{<FiUser/>}</Navbar.Brand></NavLink>
      <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/orders/cart"><Navbar.Brand>Cart{<FiShoppingCart/>}</Navbar.Brand></Link>
        </Nav.Link>
        <Nav.Link eventKey={2}>
          <NavLink to="/users/register"><Navbar.Brand>Register</Navbar.Brand></NavLink>
        </Nav.Link>
        </>

        : <>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/orders/cart"><Navbar.Brand>My Cart{<FiShoppingCart/>}</Navbar.Brand></Link>
        <Nav.Link>
         <a onClick={handleLogout}className="nav-link">Logout</a>
        </Nav.Link>
        </>

      }
    
      </Nav>
    </Navbar.Collapse>
  </Navbar></div>




}

export default Navigation;