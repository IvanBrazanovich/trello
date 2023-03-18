import {
  Gear,
  Heart,
  Plus,
  SquaresFour,
  Stack,
  Table,
  Users,
  WaveTriangle,
} from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWorkSpaces } from "../../features/app/boardFunctions/workSpacesFunctions";
import styles from "../../styles/app/components/sideBarHome.module.scss";
import Accordion from "./Accordion";

const SideBarHome = () => {
  const dispatch = useDispatch();
  const { workSpaces } = useSelector((state) => state.board);
  console.log(workSpaces);
  useEffect(() => {
    dispatch(getWorkSpaces());
  }, []);

  return (
    <aside className={styles.sideBarHome}>
      <ul className={styles.sideList}>
        <Link to="/app">
          <li>
            <Table size={20} weight="bold" /> Tableros
          </li>
        </Link>
        <li>
          <Stack size={20} weight="bold" /> Plantillas
        </li>
        <li>
          {" "}
          <WaveTriangle size={20} weight="bold" /> Inicio
        </li>
      </ul>

      {/* Espacios de trabajo */}
      <div className={styles.sideWorkSpaces}>
        <p className={styles.sideWorkSpaces__header}>
          Espacios de Trabajo
          <Plus size={15} />
        </p>

        <div className={styles.sideWorkSpaces__list}>
          {Object.values(workSpaces).length > 0 &&
            Object.values(workSpaces).map((item) => {
              return (
                <Accordion title={item.name} key={item.id}>
                  <ul className={styles.accordion__list}>
                    <Link to={`w/${item.id}`}>
                      <li>
                        <Table size={20} weight="regular" /> Tableros
                      </li>
                    </Link>
                    <li>
                      <Heart size={20} weight="regular" /> Lo más destacado
                    </li>
                    <li>
                      <SquaresFour size={20} weight="regular" /> Vistas
                    </li>
                    <li>
                      <Users size={20} weight="regular" /> Usuarios
                    </li>
                    <li>
                      <Gear size={20} weight="regular" /> Configuración
                    </li>
                  </ul>
                </Accordion>
              );
            })}
        </div>
      </div>
    </aside>
  );
};

export default SideBarHome;
