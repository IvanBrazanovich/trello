import { Aperture, CaretDown, CaretUp } from "@phosphor-icons/react";
import React, { useState } from "react";
import styles from "../../styles/app/components/accordion.module.scss";

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordion__title}
        onClick={() => setIsActive(!isActive)}
      >
        <div type="title">
          <Aperture /> {title}
        </div>
        <div>{isActive ? <CaretUp size={20} /> : <CaretDown size={20} />}</div>
      </div>
      {isActive && <div className={styles.accordion__content}>{children}</div>}
    </div>
  );
};

export default Accordion;
