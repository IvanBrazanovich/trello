import { Plus, X } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addListToBoard,
  getBoard,
} from "../../../features/app/boardFunctions/boardFunctions";
import styles from "../../../styles/app/components/kanbanBoard.module.scss";

const AddList = () => {
  const [activeAddList, setActiveAddList] = useState(false);
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const handleAddList = () => {
    if (listName.trim().length > 0) {
      dispatch(addListToBoard({ listName }));
      setListName("");
    }
  };
  return (
    <div className={styles.addFunction}>
      <div
        className={`${styles.buttonAdd} ${
          activeAddList ? styles.buttonAdd__active : ""
        }`}
      >
        <button onClick={(e) => setActiveAddList(!activeAddList)}>
          Añada una Lista <Plus size={20} />
        </button>
      </div>

      <div
        className={` ${styles.action} ${
          activeAddList ? styles.action__active : ""
        }
      }`}
      >
        <input
          type="text"
          placeholder="Introduzca Título de Lista"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />

        <div className={styles.action__wrapper}>
          <button onClick={handleAddList}>
            <Plus size={16} />
            Añada una Tarjeta
          </button>

          <div>
            <X onClick={(e) => setActiveAddList(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddList;
