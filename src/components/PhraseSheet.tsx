import PhraseForm from "./PhraseForm"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import { useRecoilState } from "recoil"
import phrseSheetAtom from "@/store/phraseSheet"

const PhraseSheet = () => {
  
  const [isOpen,setIsOpen] = useRecoilState(phrseSheetAtom)

  const onClose = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                      Change phrase
                    </SheetTitle>
                    <SheetDescription>
                      This is the seed phrase for your wallet
                    </SheetDescription>
                </SheetHeader>
                
                <PhraseForm />
            </SheetContent>
        </Sheet>

        

  )
}

export default PhraseSheet