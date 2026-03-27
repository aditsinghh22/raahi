import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Mock API call since there's no backend yet
const subscribeToWaitlist = async (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !email.includes('@')) {
        reject(new Error("Invalid email address"));
      } else {
        resolve({ success: true, email });
      }
    }, 1200);
  });
};

export function useJoinWaitlist() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: subscribeToWaitlist,
    onSuccess: () => {
      toast({
        title: "Welcome to the future of compliance.",
        description: "You've been added to the early access list.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: error.message || "Failed to join waitlist. Try again.",
      });
    }
  });
}
