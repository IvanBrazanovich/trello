import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkSpaces } from "../../features/app/boardSlice";
import WorkSpacePreview from "../../pages/app/WorkSpacePreview";
import styles from "../../styles/app/components/workspaces.module.scss";

const WorkSpaces = () => {
  const dispatch = useDispatch();
  const { workSpaces } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(getWorkSpaces());
  }, []);
  return (
    <div className={styles.workSpaces}>
      <p className={styles.rightSide__text}>Tus Espacios de Trabajo</p>

      <div className={styles.workSpaces__list}>
        {workSpaces.length > 0 &&
          workSpaces.map((item) => {
            return <WorkSpacePreview key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
};

export default WorkSpaces;
