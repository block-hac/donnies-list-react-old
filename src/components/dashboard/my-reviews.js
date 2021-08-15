import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Cookies, withCookies } from "react-cookie";
import { instanceOf } from "prop-types";
// import * as actions from '../../actions/messaging';
import {
  // Modal,
  // Button,
  Panel,
  Table,
} from "react-bootstrap";
import { connect } from "react-redux";

import { getUserReviews } from "../../actions/user";
import SidebarMenuUser from "./sidebar-user";

// const socket = actions.socket;

class MyReviews extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      userReviews: [],
    };
  }

  componentDidMount() {
    const userCookie = this.props.cookies.get("user");
    const userEmail = userCookie.email;
    this.props.getUserReviews({ userEmail }).then(
      (response) => {
        //console.log('**** get user reviews success  ****'+ JSON.stringify(response) );
        const userReviews = response.userReviews;
        this.setState({
          userReviews,
        });
      },
      (err) =>
        err.response.json().then(({ errors }) => {
          //console.log('**** get user reviews error ****'+ JSON.stringify(errors) );
        })
    );
  }

  breadcrumb() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="breadcrumb-item">My reviews</li>
      </ol>
    );
  }

  renderUserReview() {
    var userReviews = this.state.userReviews;
    if (userReviews !== undefined && userReviews !== "") {
      if (userReviews.length === 0) {
        return (
          <tr>
            <td colSpan="5" className="text-center">
              No reviews found!
            </td>
          </tr>
        );
      }
      return userReviews.map((reviews, index) => (
        <tr key={`TR_${index}`}>
          <td>{index + 1}</td>
          <td>{reviews.expertFullName}</td>
          <td>{reviews.title}</td>
          <td>{reviews.review}</td>
          <td>{reviews.rating}</td>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div className="container my-reviews-wrapper">
        <div className="row">
          {this.breadcrumb()}

          <div className="wrapper-sidebar-page">
            <div className="row row-offcanvas row-offcanvas-left">
              <SidebarMenuUser />
              <div className="column col-sm-9 col-xs-11">
                <Panel header={<h3>My reviews</h3>} bsStyle="primary">
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th width="6%">#</th>
                        <th width="15%">Expert Name</th>
                        <th width="15%">Title</th>
                        <th width="60%">Review</th>
                        <th width="4%">Rating</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderUserReview()}</tbody>
                  </Table>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUserReviews })(withCookies(MyReviews));
