import React from "react";

export default function ALert(props) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        {props.message}
      </div>
    </div>
  );
}
