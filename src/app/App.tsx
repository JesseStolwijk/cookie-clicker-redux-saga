import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Store from "./Store";
import { useNumberOfCookies, State } from "../state";
import CookieImage from "../assets/perfectCookie.png";

function App() {
  const dispatch = useDispatch();
  const numberOfCookies = useNumberOfCookies();
  const cookiesPerSecond = useSelector(
    (state: State) => Math.round(state.cookiesPerSecond * 10) / 10
  );

  return (
    <div>
      <h1>{numberOfCookies} cookies</h1>
      <div>per second: {cookiesPerSecond}</div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        <img src={CookieImage}></img>
      </button>

      <Store />
    </div>
  );
}

export default App;
