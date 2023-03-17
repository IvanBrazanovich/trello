import React, { useState } from "react";
import { Outlet } from "react-router";
import CreateBoard from "../../components/app/CreateBoard";
import SideBarHome from "../../components/app/SideBarHome";
import WorkSpaces from "../../components/app/WorkSpaces";
import Modal from "../../components/Modal";
import styles from "../../styles/app/pages/home.module.scss";
const Home = () => {
  const [modal, setModal] = useState(false);

  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };

  return (
    <main className={styles.home}>
      {/* <button onClick={handleClickOpenModal}>Crear Tablero</button>   */}
      <div className={styles.home__sidebar}>
        <SideBarHome />
      </div>

      <div className={styles.home__rightSide}>
        <Outlet />
      </div>

      {modal && (
        <Modal>
          <CreateBoard />
        </Modal>
      )}
    </main>
  );
};

export default Home;
