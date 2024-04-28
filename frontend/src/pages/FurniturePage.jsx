import React from 'react'


const FurnituresPage = ({data}) => {
  // Check if data is null
  if (!data) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  // Assuming data.tutorial exists, render it
  return (
    <div>{data.tutorial}</div>
  );
}

export default FurnituresPage