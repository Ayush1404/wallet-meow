import { atom } from "recoil";

const phraseAtom = atom<{
    phrase: Array<string>,
    seed: Uint8Array
}>({
    key: 'Phrase',
    default: {
        phrase: ['', '', '', '', '', '', '', '', '', '', '',''],
        seed: new Uint8Array()
    }
});

export default phraseAtom;