import React, {FC, JSX} from "react";
import styles from './StateBlock.module.css';
import canvasState from "../../store/canvasState";


interface IStateBlockProps {
  openModal: () => void;
}

const StateBlock: FC<IStateBlockProps> = ({openModal}): JSX.Element => {
  const clickHandler = () => {
    openModal()
  }

  return (
    <aside className={styles.state}>
      <button className={styles.state__btn}
              onClick={clickHandler}>Login
      </button>
      <div>
        <h3 className={styles.state__title}>{canvasState.username}</h3>
      </div>

    </aside>
  );
}
export default StateBlock;
