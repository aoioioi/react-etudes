import React, { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import foodHero from '../../assets/table.jpg';
import styled from "styled-components";

const H2 = styled.h2`
  color: white;
  &:hover { 
    color: blue; 
  }
`;

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <H2 id="h" className={classes.yellow}><a className={classes.brand}href="/">The Eatery</a></H2>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={foodHero} alt="Table of deliciousness" />
      </div>
    </Fragment>
  );
}

export default Header;