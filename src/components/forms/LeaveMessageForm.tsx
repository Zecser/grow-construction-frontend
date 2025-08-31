import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveMessageSchema } from "../../utils/validations/leave-a-message";
import { z } from "zod";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FormInput from "./FormInput";

type LeaveMessageFormValues = z.infer<typeof leaveMessageSchema>;

const LeaveMessageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeaveMessageFormValues>({
    resolver: zodResolver(leaveMessageSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LeaveMessageFormValues) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-request/`,
        data
      );

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your request has been submitted successfully.",
          confirmButtonColor: "#16a34a",
        });
        reset();
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit. Please try again later.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4 gap-2 bg-black">
      <p className="text-xl font-semibold text-white">Get A Free Quote</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-4 md:grid grid-cols-2 gap-5">
          <FormInput
            label="Name"
            placeholder="Enter your name"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <FormInput
            label="Contact Number"
            placeholder="Enter your number"
            name="contact_number"
            register={register}
            error={errors.contact_number?.message}
          />
        </div>

        <div className="space-y-4 md:grid grid-cols-2 gap-5">
          <FormInput
            label="Location"
            placeholder="Enter location"
            name="location"
            register={register}
            error={errors.location?.message}
          />
          <FormInput
            label="Email"
            placeholder="Enter email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
        </div>

        <FormInput
          label="Construction Type"
          placeholder="Type of construction"
          name="construction_type"
          register={register}
          error={errors.construction_type?.message}
        />

        <div className="md:py-4 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-200">Message</label>
          <Textarea
            className="!bg-white"
            placeholder="Enter your message"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full text-white" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Card>
  );
};

export default LeaveMessageForm;
