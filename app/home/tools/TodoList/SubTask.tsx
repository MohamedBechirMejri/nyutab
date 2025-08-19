import { m } from 'framer-motion'
import { useState } from 'react'
import { MdOutlineCheckCircle } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'

const Subtask = ({
  subtask,
  setProjects,
  setSubtasks,
}: {
  subtask: any
  setProjects: any
  setSubtasks: any
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const buttonAnimation = {
    initial: { opacity: 0, x: -4, scale: 0 },
    animate: {
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : -25,
      scale: isHovered ? 1.1 : 0,
    },
    whileHover: { scale: 1.25 },
    whileTap: { scale: 1 },
  }

  const handleChange = (e: any) => {
    setSubtasks((subtasks: any) => {
      // @ts-expect-error
      const { value } = e.target

      return subtasks.map((t: any) => {
        if (subtask.id !== t.id) return t
        return {
          ...subtask,
          text: value,
        }
      })
    })
  }
  const handleToggle = () => {
    setSubtasks((subtasks: any) => {
      return subtasks.map((t: any) => {
        if (subtask.id !== t.id) return t
        return {
          ...subtask,
          isCompleted: !subtask.isCompleted,
        }
      })
    })
  }

  const handleDelete = () => {
    setSubtasks((subtasks: any) => {
      return subtasks.filter((t: any) => subtask.id !== t.id)
    })
  }

  return (
    <li
      key={subtask.id}
      className="flex gap-4 -ml-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <m.div className="flex gap-4 text-2xl transition-all -left-16">
        <m.button {...buttonAnimation} onClick={handleDelete}>
          <TiDeleteOutline className="text-red-500" />
        </m.button>
        <m.button {...buttonAnimation} onClick={handleToggle}>
          <MdOutlineCheckCircle className="text-blue-500" />
        </m.button>
      </m.div>
      <input
        type="text"
        value={subtask.text}
        placeholder="What to do next?"
        className={`w-full bg-transparent border-none outline-none focus:ring-0 text-lg ${
          subtask.isCompleted ? 'line-through text-gray-500' : ''
        }`}
        onChange={handleChange}
      />
    </li>
  )
}

export default Subtask
