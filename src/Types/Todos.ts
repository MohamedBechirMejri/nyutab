export type Subtask = {
  text: string;
  isCompleted: boolean;
};
export type Task = {
  title: string;
  isCompleted: boolean;
  showSubtasks: boolean;
  subtasks: Subtask[];
};
type Project = {
  title: string;
  tasks: Task[];
};

export default Project;
