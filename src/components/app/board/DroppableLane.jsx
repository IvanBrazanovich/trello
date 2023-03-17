import React, { useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import styles from "../../../styles/app/components/kanbanBoard.module.scss";
import SortableItemContainer from "./SortableItemContainer";
import { useDispatch } from "react-redux";
import {
  addListToBoard,
  addTareaToList,
} from "../../../features/app/boardSlice";
import { Plus, X } from "@phosphor-icons/react";
const DroppableLane = ({ id, tareas, name, boardId }) => {
  const dispatch = useDispatch();
  const [tareaName, setTareaName] = useState("");
  const refDiv = useRef({});
  const [activeAddTarea, setActiveAddTarea] = useState(false);

  const handleAddTarea = (e) => {
    if (tareaName.trim().length > 0) {
      const listId = refDiv.current.getAttribute("id");
      dispatch(addTareaToList({ tareaName, listId, boardId }));
    }
  };

  const AddComponentTarea = () => {
    return (
      <div className={styles.addFunction}>
        <div
          className={`${styles.buttonAdd} ${
            activeAddTarea ? styles.buttonAdd__active : ""
          }`}
        >
          <button onClick={(e) => setActiveAddTarea(true)}>
            Añada una Tarea <Plus size={20} />
          </button>
        </div>

        <div
          className={` ${styles.action} ${
            activeAddTarea ? styles.action__active : ""
          }
      }`}
        >
          <input
            type="text"
            placeholder="Introduzca Título de Tarea"
            value={tareaName}
            onChange={(e) => setTareaName(e.target.value)}
          />

          <div className={styles.buttonTareaWrapper}>
            <button className={styles.buttonTarea} onClick={handleAddTarea}>
              <Plus size={15} /> Añadir Tarea
            </button>

            <div>
              <X size={15} onClick={(e) => setActiveAddTarea(false)} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const { setNodeRef } = useDroppable({ id });
  return (
    <div id={id} ref={refDiv} className={styles.laneWrapper}>
      <h3>{name}</h3>

      <SortableContext
        style={{ border: "1px solid black" }}
        id={id}
        items={tareas}
        strategy={rectSortingStrategy}
      >
        <ul className="droppable" ref={setNodeRef}>
          {tareas.map((item) => {
            const { name, id } = item;

            return <SortableItemContainer dataTarea={item} key={id} id={id} />;
          })}
        </ul>
      </SortableContext>
      {AddComponentTarea()}
    </div>
  );
};

export default DroppableLane;
