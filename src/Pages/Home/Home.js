import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../Public/Images/hero.svg';

import LoggedOutNav from '../../Components/LoggedOutNav';

import './_pillar.home.source.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    return (
      <div className="p-home">
        <LoggedOutNav />
        <div className="p-home__content">
          <div className="p-home__content_copy">
            {/* <h1>Fresh Budgets</h1> */}
            <h1>Keep your financials in check and start spending right.</h1>
            <Link to="/register"><button>Signup</button></Link>
          </div>
          <div className="p-home__content_image">
            <img src={Hero} width="100%" height="auto" alt="Wallet"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;