import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

import { Box, Card, Alert } from "@mui/material";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isError: false });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);

    this.setState({ isError: true });
  };

  render() {
    return (
      <React.Fragment>
        <Box className="row" sx={{ mt: 4, pb: 2 }}>
          <Box className="col-4 mx-auto">
            <Card className="card">
              <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">
                  Авторизация
                </h4>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Почта"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        pattern=".{5,30}"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        pattern=".{6,30}"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-dark btn-block">
                      Авторизоваться
                    </button>
                  </div>
                </form>
              </article>
            </Card>
          </Box>
        </Box>
        {this.state.isError && (
          <Alert severity="error">
            Ошибка авториции, неверный логин или пароль!
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { login })(Login);
