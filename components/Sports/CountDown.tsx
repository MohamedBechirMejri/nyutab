import React from "react";

const CountDown = ({ rCountdownProps }: { rCountdownProps: any }) => {
  const { days, hours, minutes, seconds } = rCountdownProps.formatted;

  return (
    <div className="flex items-center justify-center w-full gap-2 p-2 text-xl font-bold text-center capitalize">
      <h1 className="flex flex-col">
        <span className=""> {days}</span> <span className="">days</span>
      </h1>
      <h1 className="flex flex-col">
        <span className=""> {hours}</span> <span className="">hours</span>
      </h1>
      <h1 className="flex flex-col">
        <span className=""> {minutes}</span> <span className="">minutes</span>
      </h1>
      <h1 className="flex flex-col">
        <span className=""> {seconds}</span> <span className="">seconds</span>
      </h1>
    </div>
  );
};

export default CountDown;
