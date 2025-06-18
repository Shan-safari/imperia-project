
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Send } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    if (isAuthenticated) {
      navigate("/prompt-matching", { state: { initialPrompt: prompt } });
    } else {
      navigate("/auth", { state: { promptAfterAuth: prompt } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16 px-4">
      <h1 className="md:text-6xl text-4xl font-extrabold text-white mb-6 text-center max-w-4xl">
        Form meaningful connections in seconds with intelligent, AI-powered auto-matching that understands your intent.
      </h1>
      
      <div className="w-full max-w-2xl mt-8">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe who you're looking to connect with... (e.g., 'I need a mentor in fintech' or 'Looking for a co-founder with technical skills')"
            className="min-h-[120px] text-lg p-6 pr-16 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:border-white/40 focus:bg-white/20 resize-none"
            style={{ fontSize: '18px' }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="absolute bottom-4 right-4 rounded-xl px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="w-5 h-5 mr-2" />
            Find Match
          </Button>
        </div>
        
        <p className="text-white/80 text-center mt-4 text-sm">
          Press Enter to submit • {isAuthenticated ? "Ready to match" : "Sign in required"}
        </p>
      </div>
    </div>
  );
};

export default Index;
