import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <div className='navbar'>
      <Link to='/home'>Selector</Link>
      <NavLink to='/about' className='about-link' activeClassName='active'>About</NavLink>
    </div>
  )
}