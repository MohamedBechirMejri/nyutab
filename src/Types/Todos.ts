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
export type Project = {
  title: string;
  tasks: Task[];
};
