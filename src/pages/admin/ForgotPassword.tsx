import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepEmail, StepNewPassword, StepOtp, useForgotPassword } from "../../features/admin-auth";

export default function ForgotPassword() {
  const hook = useForgotPassword()

    const shouldShowMessage =
    hook.message &&
    (
      (hook.step === 1 && hook.message !== "OTP sent to email") || // show errors only in step 1
       hook.step === 2 ||
      (hook.step === 3 && hook.message !== "OTP sent to email") || // show all error messages in step 3
      hook.step === 4 // always show final success
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-[20px]">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            {hook.step === 1 && "Reset Password"}
            {hook.step === 2 && "Verify Code"}
            {hook.step === 3 && "Create New Password"}
            {hook.step === 4 && "Success"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {hook.step === 1 && (
            <StepEmail
              email={hook.email}
              setEmail={hook.setEmail}
              onNext={hook.handleSendOtp}
              loading={hook.loading}
            />
            
          )}

          {hook.step === 2 && (
            <StepOtp 
            otp={hook.otp} 
            setOtp={hook.setOtp} 
            onNext={() => hook.setStep(3)} 
            loading={hook.loading}/>
          )}

          {hook.step === 3 && (
            <StepNewPassword
              password={hook.password}
              confirm={hook.confirm}
              setPassword={hook.setPassword}
              setConfirm={hook.setConfirm}
              onSubmit={hook.handleVerifyOtp}
              loading={hook.loading}
            />
          )}
          {hook.step === 4 && (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">{hook.message}</p>
            </div>
          )}
           {shouldShowMessage && hook.step !== 4 && (
              <p
              className={`text-center text-sm ${
                hook.message === "OTP sent to email"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {hook.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
