import React, { Children } from "react";
import Header from "./Header";

const Template = (props: {
  childern:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div className="">
      <Header />
      {props.childern}
    </div>
  );
};

export default Template;
