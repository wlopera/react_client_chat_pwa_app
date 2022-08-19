import React from "react";

const Card = ({ title, styles, ...props }) => {
  return (
    <div className="d-flex align-items-center mt-2">
      <div className="card col-12 bg-light">
        <h5 className="card-header">{title}</h5>
        <div className={"card-body ".concat(styles ? styles.scroll : "")}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Card;
