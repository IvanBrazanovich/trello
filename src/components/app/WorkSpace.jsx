import { Aperture, Lock, Pencil, Plus, User } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getWorkSpace } from "../../features/app/boardFunctions/workSpacesFunctions";
import styles from "../../styles/app/components/workSpace.module.scss";
import Modal from "../Modal";
import CreateBoard from "./CreateBoard";

const WorkSpace = () => {
  // State
  const [modal, setModal] = useState(false);

  // React-Router
  const params = useParams();

  // Redux
  const dispatch = useDispatch();
  const { currentWorkSpace, workSpaces, currentBoardsOfWorkSpace } =
    useSelector((state) => state.board);
  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    const workSpaceId = params.token;

    dispatch(getWorkSpace(workSpaceId));
  }, [workSpaces, params]);

  return (
    <div className={styles.workspace}>
      <div className={styles.workspace__header}>
        <Aperture size={50} weight="fill" />
        <div>
          <p type="name">
            {currentWorkSpace.name} <Pencil size={15} weight="bold" />
          </p>
          <p type="privada">
            <Lock size={15} weight="bold" />
            Privada
          </p>
        </div>
      </div>

      <div className={styles.contenido}>
        <h4>
          <User /> Sus Tableros
        </h4>

        <div>
          <div className={styles.tableros}>
            {Object.keys(currentBoardsOfWorkSpace).length > 0 &&
              Object.entries(currentBoardsOfWorkSpace).map(([key, data]) => {
                return (
                  <Link
                    to={`/app/board/${key}`}
                    key={key}
                    onClick={(e) => handleClickBoard(key)}
                  >
                    {data.name}
                  </Link>
                );
              })}

            <button onClick={handleClickOpenModal}>
              Crear Tablero Nuevo <Plus size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <Modal setModal={setModal}>
          <CreateBoard workSpaceId={currentWorkSpace.id} />
        </Modal>
      )}
    </div>
  );
};

export default WorkSpace;
