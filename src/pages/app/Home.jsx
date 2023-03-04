import React, { useState } from "react";
import CreateBoard from "../../components/CreateBoard";
import Modal from "../../components/Modal";
import styles from "../../styles/app/pages/home.module.scss";
const Home = () => {
  const [modal, setModal] = useState(false);

  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };

  return (
    <main className={styles.home}>
      <div className={styles.home__tableros}>
        <h1>Tableros</h1>

        {/* Tableros acá */}

        <button onClick={handleClickOpenModal}>Crear Tablero</button>

        {modal && (
          <Modal>
            <CreateBoard />
          </Modal>
        )}
      </div>
    </main>
  );
};

export default Home;
