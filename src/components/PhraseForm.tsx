import { Input } from "./ui/input";
import phraseAtom from "@/store/PhraseAtom";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button"; // Import your button component if needed
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const PhraseForm = () => {
  const [phrase, setPhrase] = useRecoilState(phraseAtom);
  const [curr, setCurr] = useState(0);

  // Create a ref to store the input elements and define the correct type
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto focus the input at the current index when `curr` changes
    if (inputRefs.current[curr]) {
      inputRefs.current[curr]?.focus();
    }
  }, [curr]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, ind: number) => {
    const pasteText = e.clipboardData.getData("text");
    const words = pasteText.split(" ").filter(Boolean);

    if (words.length > 1) {
      e.preventDefault(); // Prevent the default paste behavior

      // Update the phrase starting from the current index
      setPhrase((prev) => {
        const updatedPhrase = [...prev.phrase];
        for (let i = 0; i < words.length && ind + i < updatedPhrase.length; i++) {
          updatedPhrase[ind + i] = words[i];
        }
        return { ...prev, phrase: updatedPhrase };
      });

      // Update the curr index to point to the next input after the pasted words
      setCurr((prev) => Math.min(prev + words.length, phrase.phrase.length - 1));
    }
  };

  const handleCopy = () => {
    // Join the phrase array into a single string separated by spaces
    const continuousString = phrase.phrase.join(" ");
    // Use the Clipboard API to copy the string to the clipboard
    navigator.clipboard.writeText(continuousString).then(() => {
      toast.info("Phrase copied to clipboard!"); // Show a success message
    }).catch((err) => {
      console.error("Failed to copy: ", err); // Handle any errors
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {phrase.phrase.map((word, ind) => (
          <Input
            ref={(el) => (inputRefs.current[ind] = el)} // Assign ref to each input
            disabled={curr !== ind}
            type="text"
            key={ind}
            value={word}
            autoFocus={curr === ind} // Ensure the current index input is in focus
            onChange={(e) => {
              setPhrase((prev) => ({
                ...prev,
                phrase: prev.phrase.map((word, i) =>
                  i === ind ? e.target.value : word
                ),
              }));
            }}
            onKeyDown={(e) => {
              // Handle Backspace key behavior when the current input is empty
              if (e.key === "Backspace" && word === "" && ind > 0) {
                e.preventDefault(); // Prevent deleting on the current cell
                setCurr(ind - 1); // Move to the previous input cell
              }

              // Handle spacebar or enter key to move to the next input
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault(); // Prevent default behavior for spacebar/enter
                setCurr((prev) => Math.min(prev + 1, phrase.phrase.length - 1)); // Move to the next input
              }
            }}
            onPaste={(e) => handlePaste(e, ind)} // Handle paste event
          />
        ))}
      </div>

      <div className="flex flex-row-reverse">
        <Button
            className="text-xs text-slate-400 hover:bg-white"
            onClick={handleCopy}
            variant='ghost'
        >
            <Copy size={16}/> 
            <p className="ml-2">Copy Phrase</p>
        </Button>
      </div>
      
    </div>
  );
};

export default PhraseForm;
