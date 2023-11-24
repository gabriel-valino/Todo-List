import { Clipboard } from "phosphor-react";

import styles from "./Empty.module.css"

export function Empty(){
  return(
    <div className={styles.empty}>
      <Clipboard size={56}/>
      <h1>Você ainda não tem tarefas cadastradas</h1>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div> 
  );
}