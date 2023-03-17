import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Tarea from "./Tarea";

const SortableItemContainer = ({ dataTarea, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    listStyle: "none",
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Tarea dataTarea={dataTarea} id={id} />
    </li>
  );
};

export default SortableItemContainer;
