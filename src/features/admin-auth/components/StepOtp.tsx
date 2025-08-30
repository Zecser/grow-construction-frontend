import { useRef } from "react"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepOtpProps {
  otp: string[];
  setOtp: (v: string[]) => void;
  onNext: () => void;
  loading: boolean;
}

export default function StepOtp({ otp, setOtp, onNext, loading }: StepOtpProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (val: string, index: number) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Move focus forward if value is entered
      if (val && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">
        Enter the 6 digit verification code sent to your email.
      </p>
      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            maxLength={1}
            className="w-12 h-12 text-center text-lg"
          />
        ))}
      </div>
      <Button
        className="w-full text-white"
        onClick={onNext}
        disabled={otp.some((d) => d === "") || loading}
      >
        {loading ? "Verifying..." : "Next"}
      </Button>
    </div>
  );
}
