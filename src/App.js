import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen.js";


export default function App() {
  return (

    <Router>
      <Switch>
        <Route path="/results">
         <ResultsScreen />
       </Route>
       <Route path="/">
        <HomeScreen />
       </Route>
      </Switch>
    </Router>
  );
}
