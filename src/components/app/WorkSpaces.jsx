import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkSpaces } from "../../features/app/boardFunctions/workSpacesFunctions";
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
        {Object.keys(workSpaces).length > 0 &&
          Object.entries(workSpaces).map((entry) => {
            const [key, item] = entry;
            return <WorkSpacePreview key={key} data={item} />;
          })}
      </div>
    </div>
  );
};

export default WorkSpaces;
