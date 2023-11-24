import { Trash, Check } from "phosphor-react";
import styles from "./Task.module.css"
import { TaskType } from "../App";

interface TaskProps {
  taskData: TaskType;
  toggleTaskStatus: ({ id, isComplete }: { id: string; isComplete: boolean }) => void;
  deleteTask: ({id}: {id:string}) => void
}

export function Task( { taskData, toggleTaskStatus, deleteTask}:TaskProps ){

  const checkboxIsChecked = taskData.isComplete
    ? styles.checkboxChecked
    : styles.checkboxUnchecked
  
  const pargraphAccordingWithCheckbox = taskData.isComplete
    ? styles.taskCompleteParagraph
    : styles.taskIncompleteParagraph

  function handleTaskToggle(){
    toggleTaskStatus({id:taskData.id, isComplete: taskData.isComplete})
  }

  function handleDeleteTask(){
    deleteTask(taskData)
  }

  return(
    <div className={styles.task}>
      <div>
        <label htmlFor="checkbox" className={styles.taskContent} onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={taskData.isComplete} />
          <span className={`${styles.checkbox} ${checkboxIsChecked}`}>
            {taskData.isComplete && <Check size={12} />}
          </span>

          <p className={pargraphAccordingWithCheckbox}>
            {taskData.content}
          </p>
        </label>
      </div>

      <button className={styles.deleteButton} onClick={handleDeleteTask}>
        <Trash className={styles.trashIcon}/>
      </button>
    </div>
  );
}
