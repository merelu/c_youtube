import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOutUser } from "@_actions/user_action";

function LandingPage() {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img src={userData?.image} alt={userData.email} />
      <h2>시작페이지</h2>
    </div>
  );
}

export default LandingPage;
