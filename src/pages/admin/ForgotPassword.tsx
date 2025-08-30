import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepEmail, StepNewPassword, StepOtp, useForgotPassword } from "../../features/admin-auth";

export default function ForgotPassword() {
  const hook = useForgotPassword()

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-[20px]">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            {hook.step === 1 && "Reset Password"}
            {hook.step === 2 && "Verify Code"}
            {hook.step === 3 && "Create New Password"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {hook.step === 1 && (
            <StepEmail
              emailOrPhone={hook.email}
              setEmailOrPhone={hook.setEmail}
              onNext={() => hook.setStep(2)}
            />
          )}

          {hook.step === 2 && (
            <StepOtp otp={hook.otp} setOtp={hook.setOtp} onNext={() => hook.setStep(3)} />
          )}

          {hook.step === 3 && (
            <StepNewPassword
              password={hook.password}
              confirm={hook.confirm}
              setPassword={hook.setPassword}
              setConfirm={hook.setConfirm}
              onSubmit={() => alert("Password reset successful!")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
