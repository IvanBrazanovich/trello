import React from "react";

const Tarea = ({ dataTarea, id }) => {
  return (
    <div
      className="item"
      style={{ border: "1px solid black", padding: "1rem" }}
    >
      {dataTarea.name} --- {id}
    </div>
  );
};

export default Tarea;
