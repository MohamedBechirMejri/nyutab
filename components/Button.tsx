const Button = ({
  name,
  className,
  style,
  soon = false,
  handleClick,
}: {
  name: string
  style?: any
  className?: string
  soon?: boolean
  handleClick: () => void
}) => {
  return (
    <button
      className={`w-full h-full transition-all rounded-2xl hover:rounded-4xl active:rounded-[3rem] backdrop-blur hover:backdrop-blur-xl text-3xl select-none font-bold ${className}`}
      onClick={handleClick}
      style={{ ...style }}
    >
      {name}
      {soon && <p className="text-xs">soon</p>}
    </button>
  )
}

export default Button
