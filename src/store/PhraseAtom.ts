import { atom } from "recoil"

const phraseAtom = atom({
    key:'Phrase',
    default:new Array<string>(12)
})

export default phraseAtom;
