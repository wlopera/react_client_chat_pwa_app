import React, { useEffect, useRef } from "react";

import Card from "./Card";
import styles from "./Messages.module.css";

const Messages = ({ data }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ bahavior: "smooth" });
  });

  return (
    <div>
      <Card title="Mensajes" styles={styles}>
        <div>
          {data.map((obj, index) => (
            <div key={index}>{obj.message}</div>
          ))}
          <div ref={divRef}></div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
