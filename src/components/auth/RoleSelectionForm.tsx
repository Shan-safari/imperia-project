
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";

const primaryRoles = [
  "Mentor",
  "Mentee",
  "Co-founder",
  "Founder",
  "Advisor",
  "Advisory Client",
  "Service Provider",
  "Service Client",
  "Job Seeker",
  "Job Recruiter",
  "Investor",
  "Startup",
] as const;

const FormSchema = z.object({
  primaryRole: z.enum(primaryRoles, {
    required_error: "You need to select a primary role.",
  }),
  secondaryRole: z.enum(primaryRoles).optional(),
});

export function RoleSelectionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with:", data);
    
    // Store role data in localStorage for the questionnaire
    localStorage.setItem('selectedRoles', JSON.stringify(data));
    
    if (data.secondaryRole) {
      // If user selected a secondary role, go to role-specific questionnaire
      navigate(`/questionnaire/${data.primaryRole.toLowerCase().replace(' ', '-')}`);
    } else {
      // If only primary role selected, go to simple signup
      navigate("/signup");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="primaryRole"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">
                Public Visible Primary Role (For Your Account):
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {primaryRoles.map((role) => (
                    <FormItem
                      key={role}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={role} />
                      </FormControl>
                      <FormLabel className="font-normal">{role}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryRole"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">
                Secondary Role To Match With (Optional):
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                If you don't want to match right now, you can just click
                Continue below.
              </p>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {primaryRoles.map((role) => (
                    <FormItem
                      key={role}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={role} />
                      </FormControl>
                      <FormLabel className="font-normal">{role}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-3 text-base">
          Continue
        </Button>
      </form>
    </Form>
  );
}
