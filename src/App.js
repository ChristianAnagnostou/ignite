import React from "react";
// Router
import { Route } from "react-router-dom";
// Components
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
// Styles
import GlobalStyles from "./components/GlobalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <SearchBar />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
