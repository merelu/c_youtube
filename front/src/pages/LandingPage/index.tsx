import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOutUser } from "@_actions/user_action";

function LandingPage() {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <>
      <img src={userData?.image} alt={userData.email} />
      <h2>시작페이지</h2>
    </>
  );
}

export default LandingPage;
