import { atom } from "recoil"

const phraseAtom = atom<{
    phrase:Array<string>,
    seed:string
}>({
    key:'Phrase',
    default:{
        phrase:['','','','','','','','','','','',''],
        seed:''
    }
})

export default phraseAtom;
