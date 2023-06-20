import React, {JSX, useState} from "react";
import styles from './SettingsBar.module.css'
import toolState from "../../store/toolState";

const SettingsBar = (): JSX.Element => {

  const [width, setWidth] = useState(1);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (width > 0 && width < 51) {
      toolState.setLineWidth(width);
    } else if (width < 1) {
      setWidth(1)
      toolState.setLineWidth(width);
    } else if (width > 50) {
      setWidth(50);
      toolState.setLineWidth(width);
    } else {
      setWidth(1);
      toolState.setLineWidth(width);
    }
  }

  const changeWidthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWidth(+e.target.value);
  }
  return (
    <div className={styles.settingsbar}>
      <form onSubmit={submitHandler}>
      <label htmlFor="lineWidth">Width of the line: </label>
      <input type="number"
             value={width}
             onChange={changeWidthHandler}
             min={1}
             max={50}
             id="lineWidth"/>
        <button type={"submit"}>S</button>
      </form>
    </div>
  );
}
export default SettingsBar;
