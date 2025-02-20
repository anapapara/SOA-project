import React from "react";

const LoggedUserLabel = () => {
  const userEmail = sessionStorage.getItem("userEmail");

  return (
    <div className="logged-user">
      <span className="user-label">Logged in as:</span> {userEmail}
    </div>
  );
};

export default LoggedUserLabel;
