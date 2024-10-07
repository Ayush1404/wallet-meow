import { atom } from "recoil";

// Define the type for an Account
type Account = {
  privateKey: Uint8Array;  // The private key derived from the seed
  publicKey: Uint8Array;   // The corresponding public key for the account
  accountName: string;     // Name to identify the account (e.g., "Account 1", "Account 2")
};

// Atom to manage the list of accounts
const accountsAtom = atom<Account[]>({
  key: 'Accounts',
  default: [],
});

export default accountsAtom;
