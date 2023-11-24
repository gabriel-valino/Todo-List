import styles from "./Header.module.css"

import todoLogo from "../assets/rocket-icon.svg"

export function Header(){
  return(
    <header className={styles.header}>
      <img src={todoLogo} alt="To-do Logotipo: Foguete azul"/>
      <h1>to<span>do</span></h1>
    </header>
  )
}