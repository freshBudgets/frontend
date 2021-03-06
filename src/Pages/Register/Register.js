import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { format, normalize } from 'react-phone-input-auto-format';

import { signupUser } from '../../Actions';
import SideBarView from '../../Components/SideBarView';
import './_pillar.login.source.scss';

const propTypes = {
  signupUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMap: PropTypes.object,
  isFetching: PropTypes.bool,
  user: PropTypes.object,
};

const defaultProps = {
  signupUser: _noop,
  isAuthenticated: false,
  errorMap: {},
  isFetching: false,
  user: {
    isVerified: false
  }
};

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formattedPhoneNumber: ''
    }

    this.changePhoneNumber = this.changePhoneNumber.bind(this);
  }

  changePhoneNumber(e) {
    this.setState({
      formattedPhoneNumber: format(e.target.value)
    })
  }

  handleClick(event) {
    const creds = {
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim(),
      phoneNumber: normalize(this.refs.phone.value.trim()),
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    }

    this.props.signupUser(creds);
  }

  render() {
    const { errorMap, isAuthenticated, isFetching, user } = this.props;
    if (isAuthenticated && !user.isVerified) return(<Redirect to="/verify_phone"/>);
    if (isAuthenticated) return(<Redirect to="/dashboard"/>);

    return (
      <SideBarView isFetching={isFetching}>
        <h1>FreshBudgets</h1>
        <input type='text' ref='firstName' className="form-control" placeholder='First Name'/>
        <input type='text' ref='lastName' className="form-control" placeholder='Last Name'/>
        <input type='text' ref='email' className="form-control" placeholder='Email'/>
        <input onChange={this.changePhoneNumber} value={this.state.formattedPhoneNumber} type='text' ref='phone' className="form-control" placeholder='Phone Number'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)}>
          Register
        </button>

        {errorMap.message &&
          <p>{errorMap.message}</p>
        }
        <div className="p-login__extra_links">
          <Link to="/login" className="p-login__links">Already have an account? Login</Link>
        </div>
      </SideBarView>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, errorMap, isFetching, user } = state.user;

  return {
    isAuthenticated,
    errorMap,
    isFetching,
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  signupUser: (creds) => dispatch(signupUser(creds))
});

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
