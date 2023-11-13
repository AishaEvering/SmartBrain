import React from "react";

const Instructions = ({ isVisible }) => {
  if (isVisible === true) {
    return (
      <div className="informBlock">
        <ul className="white">
          <li>Hover over the boxes to reveal the faces underneath.</li>
          <li>Click on a box to show a face.</li>
          <li>Click on a face to hide a face.</li>
          <li>Screenshot your edited image.</li>
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Instructions;
