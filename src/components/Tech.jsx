import { CubeCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";


const Tech = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <CubeCanvas icon={technology.icon} />
        </div>
      ))}
    </div> 
  )
}

export default SectionWrapper(Tech, "")