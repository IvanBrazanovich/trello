import {
  Aperture,
  Lock,
  Pencil,
  PencilCircle,
  Plus,
  User,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getWorkSpaces,
  setAlertAsyncWithRedirect,
} from "../../features/app/boardSlice";
import styles from "../../styles/app/components/workSpace.module.scss";
import Modal from "../Modal";
import CreateBoard from "./CreateBoard";

const WorkSpace = () => {
  const [workSpace, setWorkSpace] = useState({});
  const { workSpaces } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const params = useParams();
  const navigateFunction = useNavigate();
  // State
  const [boardsData, setBoardsData] = useState({});

  // Redux
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const handleClickOpenModal = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(getWorkSpaces());
  }, []);

  useEffect(() => {
    const getWorkSpace = () => {
      const boards = JSON.parse(localStorage.getItem("boards"));

      const workSpaceId = params.token;
      const workSpaceFiltered = workSpaces.filter(
        (item) => item.id === workSpaceId
      );

      console.log(workSpaceFiltered);

      if (!workSpaceFiltered[0]) {
        return dispatch(
          setAlertAsyncWithRedirect({
            alert: { msg: "Something went wrong", error: true },
            navigateFunction,
          })
        );
      }

      let workSpaceBoards = {};

      workSpaceFiltered[0]?.boards?.forEach((item) => {
        if (boards[item]) {
          const { name } = boards[item];
          workSpaceBoards[item] = { name };
        }
      });
      setBoardsData(workSpaceBoards);
      console.log(workSpaceBoards);

      setWorkSpace(workSpaceFiltered[0]);
    };

    getWorkSpace();
  }, [workSpaces, params]);

  return (
    <div className={styles.workspace}>
      <div className={styles.workspace__header}>
        <Aperture size={50} weight="fill" />
        <div>
          <p type="name">
            {workSpace.name} <Pencil size={15} weight="bold" />
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
            {Object.keys(boardsData).length > 0 &&
              Object.entries(boardsData).map(([key, data]) => {
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
              Crear Tablero Nuevo <Plus size={20} weight="regular" />
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <Modal>
          <CreateBoard workSpaceId={workSpace.id} />
        </Modal>
      )}
    </div>
  );
};

export default WorkSpace;
