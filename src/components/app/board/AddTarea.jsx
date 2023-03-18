import React, { useState } from "react";
import { Plus, X } from "@phosphor-icons/react";
import styles from "../../../styles/app/components/kanbanBoard.module.scss";
import { useDispatch } from "react-redux";
import { addTareaToList } from "../../../features/app/boardFunctions/tareasFunctions";

const AddTarea = ({ refDiv }) => {
  const [tareaName, setTareaName] = useState("");
  const [activeAddTarea, setActiveAddTarea] = useState(false);

  // React redux
  const dispatch = useDispatch();

  const handleAddTarea = (e) => {
    if (tareaName.trim().length > 0) {
      const listId = refDiv.current.getAttribute("id");
      dispatch(addTareaToList({ tareaName, listId }));
      setTareaName("");
    }
  };

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

export default AddTarea;
