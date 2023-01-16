import React from "react";

const MyPolls = (props: { list: [object] }) => {
  return (
    <div>
      <h4>My polls</h4>

      {props.list.map((poll: object) => {
        return <div></div>;
      })}
    </div>
  );
};

export default MyPolls;
