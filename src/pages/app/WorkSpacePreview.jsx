import {
  Archive,
  Gear,
  Plus,
  SquaresFour,
  Table,
  Users,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CreateBoard from "../../components/app/CreateBoard";
import Modal from "../../components/Modal";
import styles from "../../styles/app/components/workspaces.module.scss";

const WorkSpacePreview = ({ data }) => {
  // State
  const [boardData, setBoardData] = useState({});
  const [modal, setModal] = useState(false);

  // Redux
  const navigate = useNavigate();
  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };
  useEffect(() => {
    const getBoards = () => {
      const boards = JSON.parse(localStorage.getItem("boards"));
      let workSpaceBoards = {};
      data.boards.forEach((item) => {
        if (boards[item]) {
          const { name } = boards[item];
          workSpaceBoards[item] = { name };
        }
      });
      setBoardData(workSpaceBoards);
    };

    getBoards();
  }, []);

  const handleClickBoard = (id) => {
    navigate(`board/${id}`);
  };

  return (
    <div className={styles.workSpace}>
      <div className={styles.info}>
        <p className={styles.info__name}>
          <Archive /> {data.name}
        </p>

        <div className={styles.info__buttons}>
          <Link to={`w/${data.id}`}>
            <Table weight="regular" /> Tablero
          </Link>

          <button>
            <SquaresFour weight="regular" /> Miembros
          </button>
          <button>
            <Users weight="regular" /> Vistas
          </button>
          <button>
            <Gear weight="regular" /> Configuración
          </button>
        </div>
      </div>

      <div className={styles.workSpace__list}>
        {Object.keys(boardData).length > 0 &&
          Object.entries(boardData).map(([key, data]) => {
            return (
              <div key={key} onClick={(e) => handleClickBoard(key)}>
                {data.name}
              </div>
            );
          })}
        <button onClick={handleClickOpenModal}>
          Crear Tablero Nuevo <Plus size={20} weight="regular" />
        </button>
      </div>

      {modal && (
        <Modal setModal={setModal}>
          <CreateBoard workSpaceId={data.id} />
        </Modal>
      )}
    </div>
  );
};

export default WorkSpacePreview;
