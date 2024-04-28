import React from 'react'

const AboutUsPage = ({data}) => {
    // Check if data is null
    if (!data) {
      return <div>Loading...</div>; // or any other loading indicator
    }
  
    // Assuming data.tutorial exists, render it
    return (
      <div>{data[0].furni_desc}</div>
    );
}

export default AboutUsPage