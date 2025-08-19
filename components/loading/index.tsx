import './style.css'

const Loading = () => {
  const styles =
    'absolute p-8 rounded-full loading dark:ring-slate-100 top-1/2 left-1/2 ring-slate-500 ring -translate-y-1/2 -translate-x-1/2 opacity-0'

  return (
    <div className="relative w-full h-full">
      <div className={styles + ' [animation-delay:0s!important]'} />
      <div className={styles + ' [animation-delay:.5s!important] '} />
      <div className={styles + ' [animation-delay:.75s!important] '} />
    </div>
  )
}

export default Loading
