import { atom } from "recoil"

type Account = {
    privateKey : Uint8Array,
    publicKey : Uint8Array
}

const accountsAtom = atom<Account[]>({
    key:'Accounts',
    default:[]
})

export default accountsAtom;
