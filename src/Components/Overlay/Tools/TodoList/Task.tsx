import Subtask from "./SubTask";

const Task = ({ task, id }: { task: any; id: number }) => {
  return (
    <div key={"task-" + id}>
      <div className="flex gap-4 pb-4 text-2xl">
        <h2> {task.title}</h2>
        <div className="flex gap-4">
          <button>+</button>
          <button>-</button>
          <button>x</button>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {task.subtasks.map((subtask: any, subtaskIndex: any) => (
          <Subtask subtask={subtask} id={subtaskIndex} />
        ))}
      </ul>
    </div>
  );
};

export default Task;
