import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepEmailProps {
  emailOrPhone: string;
  setEmailOrPhone: (v: string) => void;
  onNext: () => void;
}

export default function StepEmail({
  emailOrPhone,
  setEmailOrPhone,
  onNext,
}: StepEmailProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">
        Enter the email ID or mobile number associated with your account and
        we’ll send a verification code.
      </p>
      <Input
        placeholder="example@gmail.com or mobile number"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
      />
      <Button className="w-full text-white" onClick={onNext} disabled={!emailOrPhone}>
        Send Code
      </Button>
    </div>
  );
}
