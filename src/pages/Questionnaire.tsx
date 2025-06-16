
import { NavigationBar } from "@/components/NavigationBar";
import { useParams } from "react-router-dom";
import { MentorMenteeForm } from "@/components/questionnaires/MentorMenteeForm";
import { CoFounderForm } from "@/components/questionnaires/CoFounderForm";
import { FounderForm } from "@/components/questionnaires/FounderForm";
import { InvestorForm } from "@/components/questionnaires/InvestorForm";
import { StartupForm } from "@/components/questionnaires/StartupForm";
import { RecruiterForm } from "@/components/questionnaires/RecruiterForm";
import { JobSeekerForm } from "@/components/questionnaires/JobSeekerForm";
import { AdvisorForm } from "@/components/questionnaires/AdvisorForm";
import { AdvisoryClientForm } from "@/components/questionnaires/AdvisoryClientForm";
import { ServiceProviderForm } from "@/components/questionnaires/ServiceProviderForm";
import { ServiceClientForm } from "@/components/questionnaires/ServiceClientForm";

export default function Questionnaire() {
  const { role } = useParams<{ role: string }>();

  const renderQuestionnaire = () => {
    switch (role) {
      case "mentor":
      case "mentee":
        return <MentorMenteeForm role={role} />;
      case "co-founder":
        return <CoFounderForm />;
      case "founder":
        return <FounderForm />;
      case "investor":
        return <InvestorForm />;
      case "startup":
        return <StartupForm />;
      case "job-recruiter":
        return <RecruiterForm />;
      case "job-seeker":
        return <JobSeekerForm />;
      case "advisor":
        return <AdvisorForm />;
      case "advisory-client":
        return <AdvisoryClientForm />;
      case "service-provider":
        return <ServiceProviderForm />;
      case "service-client":
        return <ServiceClientForm />;
      default:
        return <div>Invalid role selected</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="p-8 bg-card border rounded-xl shadow-lg max-w-2xl w-full">
          <h2 className="font-bold text-3xl mb-2 text-center capitalize">
            {role?.replace('-', ' ')} Questionnaire
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Please fill out the details below to complete your profile.
          </p>
          {renderQuestionnaire()}
        </div>
      </div>
    </div>
  );
}
