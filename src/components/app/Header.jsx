import React, { useState } from "react";
import styles from "../../styles/app/components/header.module.scss";
import {
  DiamondsFour,
  Table,
  CaretDown,
  MagnifyingGlass,
  BellSimple,
  Question,
  UserCircle,
  Plus,
} from "@phosphor-icons/react";
import Modal from "../Modal";
import CreateWorkSpace from "./CreateWorkSpace";
import { Link } from "react-router-dom";

const Header = () => {
  const [modal, setModal] = useState(false);

  const handleCrearWorkSpace = (e) => {
    e.preventDefault();

    console.log("Clickeado");
    setModal(true);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__list}>
        <li type="smallscreen">
          <DiamondsFour />
        </li>
        <Link to="/app">
          <li type="title smallscreen">
            <Table />
            Krello
          </li>
        </Link>
        <li type="mas only-smallscreen">
          Más <CaretDown size={15} />
        </li>
        <li type="create only-smallscreen">
          <Plus size={20} />
        </li>
        <li>
          Espacios de Trabajo <CaretDown size={15} />
        </li>
        <li type="first">
          Reciente <CaretDown size={15} />
        </li>
        <li type="second">
          Marcado <CaretDown size={15} />
        </li>
        <li type="third">
          Plantillas <CaretDown size={15} />
        </li>
        <li>
          <button onClick={handleCrearWorkSpace}>Crear WorkSpace</button>
        </li>
      </nav>
      <nav className={styles.header__list}>
        <li type="searchBar">
          <MagnifyingGlass size={20} />
          <input type="text" />
        </li>
        <li type="smallscreen">
          <BellSimple />
        </li>
        <li type="smallscreen">
          <Question />
        </li>
        <li type="smallscreen">
          <UserCircle />
        </li>
      </nav>

      {modal && (
        <Modal>
          <CreateWorkSpace setModal={setModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
