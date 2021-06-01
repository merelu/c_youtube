import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Auth from "@hoc/Auth";
import NavBar from "@components/NavBar";
import VideoUploadPage from "@pages/VideoUploadPage";
import VideoDetailPage from "@pages/VideoDetailPage";
import SubscriptionPage from "@pages/SubscriptionPage";
import MyVideoPage from "@pages/MyVideoPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        style={{
          paddingTop: "60px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/video/upload"
            component={Auth(VideoUploadPage, true)}
          />
          <Route
            exact
            path="/video/:videoId"
            component={Auth(VideoDetailPage, null)}
          />
          <Route
            exact
            path="/subscription"
            component={Auth(SubscriptionPage, true)}
          />
          <Route exact path="/myVideo" component={Auth(MyVideoPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
