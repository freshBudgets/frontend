import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Nav from '../../Components/Nav';
import './_pillar.budget.source.scss';

const propTypes = {
}

const defaultProps = {
}

class Budget extends PureComponent {
  render() {
    return (
      <div className="p-budget">
        <Nav />
      </div>
    );
  }
}

Budget.propTypes = propTypes;
Budget.defaultProps = defaultProps;
export default Budget;
