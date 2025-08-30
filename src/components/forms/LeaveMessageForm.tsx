import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveMessageSchema } from "../../utils/validations/leave-a-message";
import { z } from "zod";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type LeaveMessageFormValues = z.infer<typeof leaveMessageSchema>;

const LeaveMessageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveMessageFormValues>({
    resolver: zodResolver(leaveMessageSchema),
  });

  const onSubmit = (data: LeaveMessageFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Card className="p-6 space-y-4 bg-black">
      <p className="text-xl font-semibold text-white">Get A Free Quote</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4 md:grid grid-cols-2 gap-[20px]">
          <Input
            className="!bg-white"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <Input
            className="!bg-white"
            placeholder="Contact Number"
            {...register("contact_number")}
          />
          {errors.contact_number && (
            <p className="text-red-500 text-sm">
              {errors.contact_number.message}
            </p>
          )}
        </div>
        <div className="space-y-4 md:grid grid-cols-2 gap-[20px]" >
          <Input
            className="!bg-white"
            placeholder="Location"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
          <Input
            className="!bg-white"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            className="!bg-white"
            placeholder="Construction Type"
            {...register("construction_type")}
          />
          {errors.construction_type && (
            <p className="text-red-500 text-sm">
              {errors.construction_type.message}
            </p>
          )}
        </div>
        <div className="md:py-4">
          <Textarea
            className="!bg-white"
            placeholder="Message"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
        <Button
          type="submit" 
          className="w-full text-white"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default LeaveMessageForm;
