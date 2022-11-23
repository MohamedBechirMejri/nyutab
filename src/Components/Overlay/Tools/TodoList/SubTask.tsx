const Subtask = ({ subtask, id }: { subtask: any; id: number }) => {
  return (
    <li key={"subtask-" + id} className="relative">
      <div className="absolute flex gap-4 -left-16">
        <button>-</button>
        <button>x</button>
      </div>
      <p> {subtask.text}</p>
    </li>
  );
};

export default Subtask;
