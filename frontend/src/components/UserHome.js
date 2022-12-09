import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    alert("Log Out successfull");
    window.localStorage.removeItem("token");
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/userProfile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  render() {
    return (
      <>
      <div>
        Name<h1>{this.state.userData.fname}</h1>
        Phone <h1>{this.state.userData.phone}</h1>
      </div>
      <button className="btn-danger" onClick={this.logOut}>l<a href="/sign-in">Log Out</a></button>
      <button className="btn-primary"> Upload Image</button>
      </>
      
    );
  }
}
