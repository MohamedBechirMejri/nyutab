import type Project from "types/todos";

import uniqid from "uniqid";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { m } from "framer-motion";
import { useState } from "react";

const Nav = ({
  children,
  projects,
  currentProject,
  setCurrentProject,
  setProjects,
}: {
  children: React.ReactNode;
  projects: Project[];
  currentProject: any;
  setCurrentProject: any;
  setProjects: any;
}) => {
  const scrollContainer = useScrollContainer();
  const [isOpen, setIsOpen] = useState(false);

  const addProject = () => {
    setProjects([
      {
        id: uniqid(),
        title: "",
        tasks: [],
      },
      ...projects,
    ]);
  };
  return (
    <div className="relative h-screen overflow-hidden font-bold text-white w-[min(65rem,95vw)] mx-auto">
      <h1 className="flex items-center justify-center h-[7rem] text-3xl relative z-10">
        Todos
      </h1>
      {/* Nav */}
      <nav className="grid h-[10%] w-full select-none grid-cols-[14rem,1fr] bg-slate-900 text-3xl font-bold text-green-100">
        <m.div
          initial={{ scale: 0, x: "-50%", y: 25 }}
          animate={{
            scale: isOpen ? 1 : 0,
            x: !isOpen ? "-50%" : "0%",
            y: isOpen ? 0 : 25,
          }}
          transition={{ type: "spring", damping: 27, stiffness: 150 }}
          className="flex items-center gap-4 p-2"
        >
          <h1>Projects</h1>
          <button
            onClick={addProject}
            className="p-2 px-6 text-teal-500 transition-all bg-teal-500 bg-opacity-25 rounded backdrop-blur-3xl active:scale-95"
          >
            +
          </button>
        </m.div>
        <div
          className="flex items-center justify-start gap-4 overflow-x-scroll noscroll"
          ref={scrollContainer.ref}
        >
          {projects.map((p, i) => (
            <m.button
              key={p.id}
              initial={{ opacity: 0, y: 15, scale: 1 }}
              animate={{
                opacity: 1,
                y: isOpen ? 0 : 550,
                scale: isOpen ? 1 : 0,
                textDecoration: currentProject === i ? "underline" : "none",
              }}
              transition={{
                type: "spring",
                damping: 27,
                stiffness: 150,
                delay: i * 0.1,
              }}
              className="flex items-center justify-center w-full h-full rounded-3xl"
              onClick={() => {
                setCurrentProject(i);
                setIsOpen(false);
              }}
            >
              {p.title || "Untitled"}
            </m.button>
          ))}
        </div>
      </nav>

      {/* Body */}
      <m.div
        initial={{ y: 0 }}
        animate={{ y: isOpen ? "15%" : 0 }}
        transition={{ type: "spring", damping: 27, stiffness: 150 }}
        className="absolute top-[7rem] z-10 w-full h-[85%] overflow-scroll rounded-lg elevation-7 scrollbar-none bg-yellow-500"
      >
        {children}
      </m.div>

      {/* Toggle */}
      <m.button
        initial={{ scale: 0, x: "-50%", y: 25, background: "#0f172a" }}
        animate={{ scale: 1, y: 0, background: isOpen ? "#dcfce7" : "#0f172a" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-14 left-1/2 z-20 h-[3.5rem] w-[3.5rem] rounded-full elevation-8"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Nav;
