import {
  Calendar,
  CaretLeft,
  Gear,
  IconContext,
  Plus,
  Rows,
  Table,
  User,
  UserRectangle,
} from "@phosphor-icons/react";
import React from "react";
import styles from "../../../styles/app/components/sideBarBoard.module.scss";

const SideBarBoard = ({ board }) => {
  return (
    <div className={styles.sideBar}>
      <IconContext.Provider value={{ weight: "bold", size: "18" }}>
        <div className={styles.header}>
          <div type="user__stats">
            <UserRectangle size={45} />

            <div>
              <p type="name">
                {board.name} <span>Easy</span>
              </p>
            </div>
          </div>

          <CaretLeft weight="bold" />
        </div>

        <div className={styles.features}>
          <div className={styles.features__first}>
            <p>
              {" "}
              <Table />
              Tableros{" "}
            </p>
            <p>
              <User /> Miembros
            </p>
            <p>
              <Gear /> Ajustes del Espacio de Trabajo
            </p>
          </div>

          <div className={styles.features__second}>
            <h4>Vistas del Espacio de Trabajo</h4>
            <p>
              <Rows />
              Tabla
            </p>
            <p>
              <Calendar /> Calendario
            </p>
          </div>
        </div>

        <div className={styles.boards}>
          <h4>
            Sus tableros <Plus />
          </h4>
        </div>
        {}
      </IconContext.Provider>
    </div>
  );
};

export default SideBarBoard;
