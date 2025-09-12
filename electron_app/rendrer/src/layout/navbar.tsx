import leftLogo from "../assets/logo2.png";;
import rightLogo from "../assets/logo2.png";

interface Props {
  title?: string;
  leftLogoSrc?: string;
  rightLogoSrc?: string;
  subtitle?: string;
}

export default function Navbar({
  title = "Life Golden Safety Rule :",
  subtitle = "Test Certification LSGR",
  leftLogoSrc = leftLogo,
  rightLogoSrc = rightLogo,
}: Props) {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center left-0 border-blue-500">
          <img
            src={leftLogoSrc}
            alt="left logo"
            className="h-auto w-auto object-contain"
          />
        </div>

        <div className="text-lg font-semibold text-center underline">{title}
            <span className="text-xs font-light"> {subtitle}</span>
        </div>

        <div className="">
          <img
            src={rightLogoSrc}
            alt="right logo"
            className="h-auto w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}
