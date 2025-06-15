
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdviceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (advice: string) => void;
}) {
  const [advice, setAdvice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advice.trim()) return;
    onSubmit(advice.trim());
    setAdvice("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-2">Leave an Advisory Comment</h3>
        <Textarea
          placeholder="Write a short advice…"
          value={advice}
          onChange={e => setAdvice(e.target.value)}
          required
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Post advice</Button>
        </div>
      </form>
    </div>
  );
}
