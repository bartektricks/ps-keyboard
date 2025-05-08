"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface RequestChangesDialogProps {
  gameTitle: string;
  initialInputSupport: string | null;
}

export function RequestChangesDialog({
  gameTitle,
  initialInputSupport,
  children,
}: React.PropsWithChildren<RequestChangesDialogProps>) {
  const [inputSupport, setInputSupport] = useState<string | null>(initialInputSupport);

  const isExecuting = false; // Replace with actual loading state if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting changes for game:", gameTitle);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Update input support type for {gameTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-3">
            {/* TODO: extract to a separate component */}
            <Label className="text-slate-700">Input Support</Label>
            <RadioGroup
              value={inputSupport}
              onValueChange={setInputSupport}
              className="space-y-2"
            >
              <RadioInput value="mouse-keyboard">
                <span>Mouse & Keyboard</span>
              </RadioInput>
              <RadioInput value="mouse">
                <span>Mouse Only</span>
              </RadioInput>
              <RadioInput value="keyboard">
                <span>Keyboard Only</span>
              </RadioInput>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isExecuting}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Request changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RadioInput({
  value,
  children,
}: React.PropsWithChildren<{ value: string }>) {
  return (
    <Label
      htmlFor={value}
      className="font-medium text-slate-700 cursor-pointer flex items-center space-x-2 rounded-md border border-slate-200 p-3"
    >
      <RadioGroupItem
        value={value}
        id={value}
        className="border-blue-600 text-blue-600"
      />
      {children}
    </Label>
  );
}
