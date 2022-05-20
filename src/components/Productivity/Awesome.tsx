import React from "react";
const Awesome = ({
  header,
  data,
}: {
  header: string;
  data: [
    {
      title: string;
      links: [
        {
          title: string;
          url: string;
          description: string;
        }
      ];
    }
  ];
}) => {
  return (
    <div className=" [grid-area:1/3/5/6] overflow-scroll h-full w-full p-2">
      <h1 className="w-full p-3 font-bold text-center">{header}</h1>
      <div className="flex flex-col gap-2">
        {data.map((section, index) => (
          <div key={index} className="flex items-center gap-2">
            <div>
              <h2 className="p-3 font-light capitalize">{section.title}</h2>
              <ul className="px-8 list-disc">
                {section.links.map((link, index) => (
                  <li
                    key={index}
                    className="p-1 px-2 transition-all rounded-lg hover:bg-slate-800"
                  >
                    <a href={link.url}>
                      <span className="font-medium">{link.title} </span> -
                      <span className="text-sm text-slate-400">
                        {" "}
                        {link.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awesome;
