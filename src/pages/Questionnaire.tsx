import { NavigationBar } from "@/components/NavigationBar";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Questionnaire() {
  const { role } = useParams<{ role: string }>();

  // This is a placeholder to show which fields would be collected.
  const getQuestionsForRole = (role?: string) => {
    if (!role) return [];
    const commonFields = ["Email", "Password", "Year of Birth", "Name", "Location (optional)"];
    switch (role) {
      case "Mentor":
        return [...commonFields, "Areas of Expertise", "Availability", "Preferred Contact Method"];
      case "Mentee":
        return [...commonFields, "Topics Needed", "Availability", "Preferred Contact Method"];
      case "Co-founder":
        return [...commonFields, "Seeking", "Your Strengths", "Product Stage", "Work Style"];
      // Other roles would be added here.
      default:
        return commonFields;
    }
  };

  const questions = getQuestionsForRole(role);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="p-8 bg-card border rounded-xl shadow-lg max-w-2xl w-full">
          <h2 className="font-bold text-3xl mb-2 text-center capitalize">
            {role} Questionnaire
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Please fill out the details below to complete your profile.
          </p>
          <form className="space-y-6">
            <p className="text-muted-foreground">The following information will be collected for your {role} profile:</p>
            <ul className="list-disc list-inside space-y-2 bg-muted/50 p-4 rounded-md">
                {questions.map(q => <li key={q}>{q}</li>)}
            </ul>
            <Button type="submit" className="w-full py-3 text-base">
              Submit Questionnaire
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
