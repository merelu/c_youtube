import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Auth from "@hoc/Auth";
import NavBar from "@components/NavBar";
import VideoUploadPage from "@pages/VideoUploadPage";

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
        <div className="app">
          <Switch>
            <Route path="/" exact component={Auth(LandingPage, null)} />
            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route path="/register" component={Auth(RegisterPage, false)} />
            <Route
              path="/video/upload"
              component={Auth(VideoUploadPage, true)}
            />
          </Switch>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
