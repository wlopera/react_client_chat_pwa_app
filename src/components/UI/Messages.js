import React, { useEffect, useRef } from "react";

import Card from "./Card";
import CardMessage from "./CardMessage";
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
            <CardMessage key={index} obj={obj} />
          ))}
          <div ref={divRef}></div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
