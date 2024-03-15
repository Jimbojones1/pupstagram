import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FeedPage from "./pages/FeedPage/FeedPage";

import { UserProvider } from "./contexts/UserContext";
// ANY component that is rendered by a route, should be stored in the
// pages folder. Every page is like an app component
import userService from "./utils/userService";

function App() {
  // the userService.getUser() when the page loads it goes into localstorage and looks for a jwt
  // token, decodes and sets it in state
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    // we call this function after userService.login(), or userService.signup()
    // in order to get the token sent back from express and store the decoded token in the state
    setUser(userService.getUser());
  }

  function logout() {
    console.log("happening");
    userService.logout();
    setUser(null);
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <UserProvider loggedUser={user}>
      <Routes>
        <Route path="/" element={<FeedPage handleLogout={logout} />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/:username"
          element={<ProfilePage handleLogout={logout} />}
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
