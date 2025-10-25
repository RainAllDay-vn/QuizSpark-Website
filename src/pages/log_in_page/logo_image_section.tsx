import pattern from "../../assets/pattern.png"
import {Link} from "react-router-dom";

export default function LogoImageSection() {
  return (
    <div className="grow hidden md:flex justify-center bg-black relative overflow-hidden">
      <img className="top-0 scale-y-[-1] absolute left-0" src={pattern} alt="Decoration Patern"/>
      <Link
        to="/"
        className="flex items-center text-6xl font-bold tracking-tight bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] bg-clip-text text-transparent transition"
      >
        QuizSpark
      </Link>
      <img className="bottom-0 absolute left-0" src={pattern} alt="Decoration Patern"/>
    </div>
  );
}