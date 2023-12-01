import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { Button, Stack } from "react-bootstrap";
import ModalAddedData from "./component/curd/ModalAddedData";
import ShowData from "./component/curd/ShowData";

const App = () => {
  return (
    <div>
      <ModalAddedData></ModalAddedData>
      <ShowData></ShowData>
    </div>
  );
};

export default App;
