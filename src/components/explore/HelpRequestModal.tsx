
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HelpRequestModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (req: { title: string; description: string; tags: string[] }) => void;
}) {
  const [form, setForm] = useState({ title: "", description: "", tags: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      description: form.description,
      tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
    });
    setForm({ title: "", description: "", tags: "" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-2">Post a Help Request</h3>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Describe your professional problem..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <Input
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}
