import {
  CaretDown,
  DotsThreeOutline,
  FunnelSimple,
  IconContext,
  Lightning,
  Rocket,
  Rows,
  Star,
  User,
  UserCircle,
  UserPlus,
  Users,
  UsersFour,
} from "@phosphor-icons/react";
import React from "react";
import styles from "../../../styles/app/components/kanbanHeader.module.scss";

const KanbanHeader = ({ name }) => {
  return (
    <div className={styles.header}>
      <IconContext.Provider value={{ weight: "regular", size: "20" }}>
        <ul>
          <li type="name separation ">{name}</li>
          <li type="background">
            <Star />
          </li>
          <li type="line-break"></li>
          <li type="background   flex">
            <UsersFour /> Visible para el Espacio de Trabajo
          </li>
          <li type="line-break"></li>

          <li type="buttonStyle flex">
            <button>
              <Rows /> Tablero
            </button>
          </li>
          <li type="background">
            <CaretDown />
          </li>
          <li type="background flex">
            <Rocket /> Power-Ups
          </li>
          <li type="background flex">
            <Lightning /> Automatización
          </li>
          <li type="line-break"></li>

          <li type="background   flex">
            <FunnelSimple />
            Filtrar
          </li>
          <li type="line-break"></li>

          <li>
            <UserCircle />
          </li>
          <li type="buttonStyle flex">
            <button>
              <UserPlus /> Compartir
            </button>
          </li>
          <li type="background flex">
            <DotsThreeOutline weight="fill" />
          </li>
        </ul>
      </IconContext.Provider>
    </div>
  );
};

export default KanbanHeader;
