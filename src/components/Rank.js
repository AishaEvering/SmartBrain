import { React, useContext } from "react";
import { UserContext } from "../context/user.context";
import "../style/Rank.css";

const Rank = () => {
  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    return (
      <div className="rank informBlock">
        <div className="rank white">{`${currentUser.name}, your current entry count is...${currentUser.entries}`}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Rank;
