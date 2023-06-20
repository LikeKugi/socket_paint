import {FC, JSX} from "react";
import styles from './NewUser.module.css'

interface INewUserProps {
  newUser: string;
}

const NewUser: FC<INewUserProps> = ({newUser}): JSX.Element => {
  return (
    <div className={styles.new}>
      <p>User {newUser} joined</p>
    </div>
  );
}
export default NewUser;
