import phrseSheetAtom from "@/store/phraseSheet"
import HeaderLogo from "./HeaderLogo"
import { Button } from "./ui/button"
import WelcomeMsg from "./WelcomeMsg"
import { useSetRecoilState } from "recoil"

const Header = () => {
    const setIsOpen = useSetRecoilState(phrseSheetAtom)
    
    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex justify-between items-center mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                    </div>
                </div>
                <WelcomeMsg />
                <div className="flex gap-2">
                    <Button className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 mt-2 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                        Generate Random
                    </Button>
                    <Button className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 mt-2 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
                        onClick={()=>setIsOpen(true)}
                    >
                        Current phrase
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header