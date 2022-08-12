import React from "react";
import styles from "./CardMessage.module.css";

const CardMessage = ({ obj }) => {
  return (
    <div className="d-flex align-items-center justify-content-center mt-1">
      <div className="card col-12">
        <div>
          {obj.type === "body" && <div className={styles.name}>{obj.name}</div>}
          {obj.type === "body" && <div>{obj.message}</div>}
          {obj.type === "login" && (
            <div className={styles.login}>{obj.message}</div>
          )}
          {obj.type === "logout" && (
            <div className={styles.logout}>{obj.message}</div>
          )}
          <div className={styles.time}>{obj.time}</div>
        </div>
      </div>
    </div>
  );
};

export default CardMessage;
