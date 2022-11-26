import AwesomeData from "../../../db/AwesomeData.json";
import { decompress } from "compress-json";

// TODO: Test Memoization

const Awesome = () => {
  // @ts-ignore
  const data = decompress(AwesomeData);

  console.log(data);

  return <div></div>;
};

export default Awesome;
