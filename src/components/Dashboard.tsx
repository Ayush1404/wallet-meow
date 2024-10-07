import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRecoilState, useRecoilValue } from "recoil";
import accountsAtom from "@/store/accountsAtom";
import phraseAtom from "@/store/PhraseAtom"; 
import * as ed25519 from "ed25519-hd-key"; 
import { Keypair, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import nacl from "tweetnacl";
import { toast } from "react-toastify";
import bs58 from 'bs58'

const Dashboard = () => {
  const [accounts, setAccounts] = useRecoilState(accountsAtom);
  const { seed } = useRecoilValue(phraseAtom); // Get the seed from phraseAtom
  const [loading, setLoading] = useState(false);

  // Function to derive a Solana account from the seed using the index
  const deriveAccountFromSeed = (seed: Buffer, index: number) => {
    
    const path = `m/44'/501'/0'/${index}'`;
    
    // Derive the ed25519 private key
    
    const { key: derivedPrivateKey } = ed25519.derivePath(path, seed.toString("hex"));
    const secret = nacl.sign.keyPair.fromSeed(derivedPrivateKey).secretKey;
    // Convert the derived private key to a KeyPair format used by Solana
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

    // Return the private and public key pair
    return {
        
      privateKey: secret,
      publicKey: new TextEncoder().encode(publicKey),
      accountName: `Account ${index + 1}`,
    };
  };

  // Handler to add a new derived account based on the seed
  const handleAddAccount = async () => {
    try {
      setLoading(true);

      if (!seed || seed.length === 0) {
        toast.error("Seed phrase is not set. Please specify a valid seed phrase.");
        return;
      }

      // Derive the new account using the next index (current number of accounts)
      const newIndex = accounts.length; // Use the current number of accounts as the next index

      const bufferSeed = Buffer.from(seed)
      const newAccount = deriveAccountFromSeed(bufferSeed , newIndex);

      // Add the newly derived account to the state
      setAccounts((prev) => [...prev, newAccount]);

      toast.success(`Account ${newIndex + 1} derived and added!`);
    } catch (error) {
      console.error("Failed to derive account:", error);
      toast.error("Failed to derive account from seed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm min-h-[150px]">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-2xl line-clamp-1">Your Accounts</CardTitle>
          <Button className="sm" onClick={handleAddAccount} disabled={loading}>
            <Plus className="size-4 mr-2" />
            {loading ? "Deriving..." : "Add new account"}
          </Button>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <p className="text-center text-slate-500">No accounts found. Create a new one!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="font-bold text-xl mb-2">{account.accountName}</h2>
                  <p className="text-sm text-slate-500">
                    <strong>Public Key:</strong>{" "}
                    {new PublicKey(account.publicKey).toBase58()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
