import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import CreateBoard from "../../components/app/CreateBoard";
import SideBarHome from "../../components/app/SideBarHome";
import WorkSpaces from "../../components/app/WorkSpaces";
import Modal from "../../components/Modal";
import { getBoards } from "../../features/app/boardFunctions/boardFunctions";
import styles from "../../styles/app/pages/home.module.scss";
const Home = () => {
  const [modal, setModal] = useState(false);

  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, []);

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
        <Modal setModal={setModal}>
          <CreateBoard />
        </Modal>
      )}
    </main>
  );
};

export default Home;
