import React, {FC, JSX, useEffect, useState} from "react";
import styles from './StateBlock.module.css';
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import {observer} from "mobx-react-lite";


interface IStateBlockProps {
  openModal: () => void;
  store: any
}

const StateBlock: FC<IStateBlockProps> = observer(({openModal, store}): JSX.Element => {
  const clickHandler = () => {
    openModal()
  }

  const [lw, setLW] = useState(toolState.tool?.ctx?.lineWidth);
  useEffect(() => {
    setLW(toolState.tool?.ctx?.lineWidth || 1)
  }, [toolState.tool?.ctx?.lineWidth, toolState.tool?.ctx, toolState.tool, toolState.lineWidth])

  return (
    <aside className={styles.state}>
      <button className={styles.state__btn}
              onClick={clickHandler}>Login
      </button>
      <div>
        <h3 className={styles.state__title}>{canvasState.username}</h3>
        <p>{store.lineWidth}</p>
        <p>Tool State: {toolState.lineWidth}</p>
        <p>LW in state: {lw}</p>
        <p>LW: {toolState.tool?.ctx?.lineWidth}</p>
      </div>

    </aside>
  );
})
export default StateBlock;
