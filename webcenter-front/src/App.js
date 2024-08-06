import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/home/Home";

class App extends Component
{
  render()
  {
    return(
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
