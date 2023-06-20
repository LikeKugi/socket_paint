import styles from './Modal.module.css'
import React, {FC, JSX, useRef} from "react";

interface IModal {
  closeModal: () => void;
  submitModal: (name: string) => void;
}


const Modal: FC<IModal> = ({closeModal, submitModal}): JSX.Element => {

  const inputNicknameRef = useRef<HTMLInputElement>(null);

  const connectionHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputNicknameRef.current && inputNicknameRef.current.value.trim().length > 0) {
      submitModal(inputNicknameRef.current.value.trim())
    }
    closeModal();
  }
  const closeHandler = (e: React.MouseEvent) => {
    if (!e.target) return;
    if ((e.target as HTMLElement).id === "backgroundModal") {
      closeModal();
    }
  }

  return (
    <div id="backgroundModal"
         className={styles.wrapper}
         onClick={closeHandler}>
      <form className={styles.modal}
            onSubmit={connectionHandler}>
        <h2 className={styles.modal__title}>Enter your nickname</h2>
        <div className={styles.modal__field}>
          <label htmlFor="nickname">Your nickname: </label>
          <input ref={inputNicknameRef}
                 type="text"
                 id="nickname"/>
        </div>

        <div className={styles.modal__fieldBtn}>
          <button type={"submit"}
                  className={styles.modal__btn}>Enter
          </button>
        </div>
        <div className={styles.modal__fieldBtn}>
          <button className={styles.modal__btn}
                  onClick={closeModal}>Close
          </button>
        </div>
      </form>
    </div>
  );
}
export default Modal;
