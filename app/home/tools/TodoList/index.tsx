import { m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getLocalData, setLocalData } from '../../../../lib/storageUtils'
import Nav from './Nav'
import Project from './Project'

const TodoList = () => {
  const [projects, setProjects] = useState<[] | null>(null)
  const [currentProject, setCurrentProject] = useState(0)

  useEffect(() => {
    ;(async () => {
      const localData = await getLocalData('tasks')
      if (localData) setProjects(localData)
    })()
  }, [])

  useEffect(() => {
    if (projects) setLocalData('tasks', projects)
  }, [projects])

  return !projects ? (
    <div> "loading" </div>
  ) : (
    <m.div initial={{ y: 10 }} animate={{ y: 0 }} className="h-full bg-slate-900">
      <Nav
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setProjects={setProjects}
      >
        {projects && projects.length ? (
          <Project project={projects[currentProject]} setProjects={setProjects} />
        ) : (
          <div />
        )}
      </Nav>
    </m.div>
  )
}

export default TodoList
