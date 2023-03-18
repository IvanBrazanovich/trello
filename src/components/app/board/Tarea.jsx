import React from "react";

import styles from "../../../styles/app/components/kanbanBoard.module.scss";

const Tarea = ({ activeId, dataTarea, id }) => {
  return (
    <div className={`${styles.tarea} ${activeId ? styles.tarea__active : ""}`}>
      {dataTarea.name}
    </div>
  );
};

export default Tarea;
