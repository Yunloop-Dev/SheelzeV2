import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/auth";

import { Box, Card } from "@mui/material";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state, this.props.history);
  };

  render() {
    return (
      <React.Fragment>
        <Box className="row" sx={{ mt: 4 }}>
          <Box className="col-4 mx-auto">
            <Card className="card">
              <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">
                  Регистрация
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
                        placeholder="Имя"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        pattern=".{3,20}"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope"></i>
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
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-dark btn-block">
                      Зарегестироваться
                    </button>
                  </div>
                </form>
              </article>
            </Card>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
