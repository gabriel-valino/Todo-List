import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import styles from "./App.module.css"

import "./global.css"

import { Header } from "./components/Header";
import { Empty } from "./components/Empty";
import { Task } from "./components/Task";

export interface TaskType {
  id: string,
  content: string,
  isComplete: boolean,
}

export function App() {
  
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [inputValue, setinputValue] = useState("")

  const hasTask = tasks.length > 0
  const completedTasks = tasks.filter(task => task.isComplete)

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault()

    const task:TaskType = {
      id: uuidv4(),
      content: inputValue,
      isComplete: false,
    }

    setTasks((state) => [...state, task])
    setinputValue("")
  }

  function handlCreateTaskChange(event: ChangeEvent<HTMLInputElement>){
    setinputValue(event.target.value)
    event.target.setCustomValidity("")
  }

  function handleInvalidMessage(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function toggleTaskStatus({id, isComplete}: { id: string; isComplete: boolean }){
    const updatedTasks = tasks.map(task => {
      if(task.id === id){

        return {... task, isComplete: !isComplete}
      }

      return {...task}
    })

    setTasks(updatedTasks)
  }

  function deleteTask({id}: {id: string}){
    const updatedTasks = tasks.filter(task =>{
      return task.id !== id
    })

    setTasks(updatedTasks)
  }
  
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        
          <form className={styles.addTodo} onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              name="createTask" 
              placeholder="Adicione uma nova tarefa"
              onChange={handlCreateTaskChange} 
              onInvalid={handleInvalidMessage}
              value={inputValue}
              required
            />
            <button type="submit">
              Criar 
              < PlusCircle size={16}/>
            </button>
          </form>

          <div className={styles.taskList}>
            <div className={styles.status}>

              <div className={styles.createdTasks}>
                <p>Tarefas criadas</p>
                <span>{tasks.length}</span>
              </div>

              <div className={styles.finishedTasks}>
                <p>Concluídas</p>
                <span>{tasks.length !== 0 ?`${completedTasks.length} de ${tasks.length}` : 0}</span>
              </div>
              
            </div>

            {
            hasTask
              ? tasks.map(task =>{
                return (
                  <Task 
                    taskData={task} 
                    key={task.id} 
                    toggleTaskStatus={toggleTaskStatus}
                    deleteTask={deleteTask}
                  />
                )
              }) 
              : <Empty/>
            }
          </div>
      </div>
    </div>
  );
}
