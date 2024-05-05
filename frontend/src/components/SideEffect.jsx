import React, { Component } from "react";
import { Helmet } from "react-helmet";

class SideEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPath: "./assets/logo.png" // Set the initial logo path here
    };
  }

  componentDidMount() {
    // Perform any side effects here, such as fetching data or setting state
    // You can also update the logo path here if needed
    // Example:
    // this.setState({ logoPath: "./assets/new-logo.png" });
  }

  render() {
    return (
      <Helmet>
        <title>FurniFit | AR Furniture App</title>
        <meta
          name="description"
          content="A Furniture AR website with recommendation based on your preferences."
        />
        <link rel="icon" type="image/png" href={this.state.logoPath} sizes="16x16" />
        {/* Add more meta tags as needed */}
      </Helmet>
    );
  }
}

export default SideEffect;
