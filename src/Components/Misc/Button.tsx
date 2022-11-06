const Button = ({
  name,
  className,
  style,
  soon = false,
  handleClick,
}: {
  name: string;
  style?: any;
  className?: string;
  soon?: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      className={
        "w-full h-24 transition-all border border-current rounded-lg active:scale-95 " +
        className
      }
      onClick={handleClick}
      style={{
        ...style,
      }}
    >
      {name}
      {soon && <p className="text-xs">soon</p>}
    </button>
  );
};

export default Button;
