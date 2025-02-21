import { Button } from "./ui/button";

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-[#024950] shadow border-b border-b-[#AFDDE5] sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#AFDDE5]">
              AI Lesson Planner
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={onLogout}
              className="px-4 py-2 cursor-pointer bg-[#AFDDE5] text-[#024950] hover:bg-[#87C1C8]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
