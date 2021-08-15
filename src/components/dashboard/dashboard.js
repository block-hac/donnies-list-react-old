import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Cookies, withCookies } from "react-cookie";
import { instanceOf } from "prop-types";

import { protectedTest } from "../../actions/auth";

import SidebarMenuAdmin from "./sidebar-admin";
import SidebarMenuExpert from "./sidebar-expert";
import SidebarMenuUser from "./sidebar-user";

class Dashboard extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.props.protectedTest();
  }

  breadcrumb() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="breadcrumb-item">Dashboard</li>
      </ol>
    );
  }

  isRole(roleToCheck, toRender) {
    const userRole = this.props.cookies.get("user").role;
    if (userRole === roleToCheck) {
      return toRender;
    }
    return false;
  }

  adminMenu() {
    return <SidebarMenuAdmin />;
  }

  expertMenu() {
    return <SidebarMenuExpert />;
  }

  userMenu() {
    return <SidebarMenuUser />;
  }

  render() {
    return (
      <div className="session-page">
        <div className="container">
          <div className="row">
            {this.breadcrumb()}
            <div className="wrapper-sidebar-page">
              <div className="row row-offcanvas row-offcanvas-left">
                {this.isRole("Admin", this.adminMenu())}
                {this.isRole("Expert", this.expertMenu())}
                {this.isRole("User", this.userMenu())}
                <div className="column col-sm-9 col-xs-11" id="main">
                  <div id="pageTitle">
                    <div className="title">Dashboard</div>
                  </div>
                  <p>{this.props.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, { protectedTest })(
  withCookies(Dashboard)
);
