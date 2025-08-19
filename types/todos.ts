export type Subtask = {
  id: any
  text: string
  isCompleted: boolean
}
export type Task = {
  id: any
  title: string
  isCompleted: boolean
  isFolded: boolean
  subtasks: Subtask[]
}
type Project = {
  id: any
  title: string
  tasks: Task[]
}

export default Project
