import React from "react";

const Tarea = ({ activeId, dataTarea, id }) => {
  return (
    <div
      className="item"
      style={{
        border: "1px solid black",
        padding: "1rem",
        transform: activeId ? "rotate(5deg)" : " ",
      }}
    >
      {dataTarea.name} --- {id}
    </div>
  );
};

export default Tarea;
