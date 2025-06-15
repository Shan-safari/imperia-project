
import { useState } from "react";
import { Input } from "@/components/ui/input";

const roleOptions = ["", "Mentor", "Mentee", "Co-founder", "Founder", "Advisor", "Advisory Client", "Service Provider", "Service Client", "Job Seeker", "Job Recruiter", "Investor", "Startup"];

export default function Filters({ value, onChange }: { value: any; onChange: (val: any) => void }) {
  const [local, setLocal] = useState(value);

  // Sync up and call parent when any changes
  const handleChange = (field: string, val: string) => {
    const updated = { ...local, [field]: val };
    setLocal(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <select
        value={local.role}
        onChange={e => handleChange("role", e.target.value)}
        className="border rounded h-10 px-2 text-sm bg-background"
      >
        <option value="">All Roles</option>
        {roleOptions.slice(1).map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <Input
        className="w-32"
        placeholder="Industry"
        value={local.industry}
        onChange={e => handleChange("industry", e.target.value)}
      />
      <Input
        className="w-32"
        placeholder="Location"
        value={local.location}
        onChange={e => handleChange("location", e.target.value)}
      />
    </div>
  );
}
