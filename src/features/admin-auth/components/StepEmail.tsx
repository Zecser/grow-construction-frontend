import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepEmailProps {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
  loading:boolean;
}

export default function StepEmail({
  email,
  setEmail,
  onNext,
  loading
}: StepEmailProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">
        Enter the email ID associated with your account and
        we’ll send a verification code.
      </p>
      <Input
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="w-full text-white" onClick={onNext} disabled={!email}>
        {loading ? "Sending..." : "Send Code"}
      </Button>
    </div>
  );
}
