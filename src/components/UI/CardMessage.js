import React from "react";
import styles from "./CardMessage.module.css";

const CardMessage = ({ obj, username }) => {
  let classContainer = "d-flex justify-content-start mt-2";
  let colorCard = { backgroundColor: "white" };

  if (username === obj.name) {
    classContainer = "d-flex justify-content-end mt-2";
    colorCard = { backgroundColor: "#D9FDD3" };
  }

  return (
    <div className={classContainer}>
      {obj.type === "body" && username === obj.name && (
        <div className="col-5"></div>
      )}
      <div className="card row-cols-auto" style={colorCard}>
        <div className="ms-2 me-2">
          {obj.type === "body" && username !== obj.name && (
            <div className={styles.name}>{obj.name}</div>
          )}
          {obj.type === "body" && <div>{obj.message}</div>}
          {obj.type === "login" && (
            <div className={styles.login}>{obj.message}</div>
          )}
          {obj.type === "logout" && (
            <div className={"ms-2 me-2 " + styles.logout}>{obj.message}</div>
          )}
          <div className={"ms-2 me-2 " + styles.time}>{obj.time}</div>
        </div>
      </div>
      {obj.type === "body" && username !== obj.name && (
        <div className="col-5"></div>
      )}
    </div>
  );
};

export default CardMessage;
