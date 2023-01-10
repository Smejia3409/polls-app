import React, { Children } from "react";
import Header from "./Header";

const Template = (props: { childern: JSX.Element }) => {
  return (
    <div className="bg-danger">
      <Header />
      {props.childern}
    </div>
  );
};

export default Template;
