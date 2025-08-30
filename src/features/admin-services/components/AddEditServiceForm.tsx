import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import ServiceImages from "./ServiceImages";
import DynamicFields from "./whyUsoffer";
import ServiceHeading from "./ServiceHeading";
import { useServiceForm } from "../hooks/useAddEditService";
import type { ServicePayload } from "../hooks/useAddEditService";
import { serviceFormSchema } from "../utils/serviceFormvalidation";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";

interface AddEditServiceFormProps {
  initialService?: any;
  onCancel?: () => void;
  onSuccess?: () => void;
}

interface FieldErrorItem {
  heading?: string;
  description?: string;
}

interface ServiceFormErrors {
  serviceName?: string;
  serviceSubTitle?: string;
  serviceSubDescription?: string;
  icon?: string;
  banner?: string;
  photo?: string;
  offers?: FieldErrorItem[];
  whyUsList?: FieldErrorItem[];
}

const AddEditServiceForm: React.FC<AddEditServiceFormProps> = ({ initialService, onCancel, onSuccess }) => {
  const { submitService, loading, Iserror } = useServiceForm();
  const errorRef = useRef<HTMLDivElement | null>(null);


  const [serviceName, setServiceName] = useState(initialService?.service_name || "");
  const [subTitle, setSubTitle] = useState(initialService?.service_sub_title || "");
  const [description, setDescription] = useState(initialService?.service_sub_decs || "");
  const [status, setStatus] = useState<"Active" | "Inactive">((initialService?.status as "Active" | "Inactive") || "Active");

  const [offers, setOffers] = useState(initialService?.offers || [{ heading: "", description: "" }]);
  const [whyUs, setWhyUs] = useState(initialService?.why_us_list || [{ heading: "", description: "" }]);

  const [serviceIcon, setServiceIcon] = useState<File | null>(null);
  const [serviceBanner, setServiceBanner] = useState<File | null>(null);
  const [servicePhoto, setServicePhoto] = useState<File | null>(null);

  const [errors, setErrors] = useState<ServiceFormErrors>({});

  const resetForm = () => {
    setServiceName("");
    setSubTitle("");
    setDescription("");
    setOffers([{ heading: "", description: "" }]);
    setWhyUs([{ heading: "", description: "" }]);
    setServiceIcon(null);
    setServiceBanner(null);
    setServicePhoto(null);
    setStatus("Active");
  };

  const handleSubmit = async () => {
    const payload = {
      serviceName,
      serviceSubTitle: subTitle,
      serviceSubDescription: description,
      icon: serviceIcon || initialService?.service_icon || null,
      banner: serviceBanner || initialService?.service_banner || null,
      photo: servicePhoto || initialService?.service_photo || null,
      offers,
      whyUsList: whyUs,
      status,
    };

    try {
      setErrors({});
      await serviceFormSchema.validate(payload, { abortEarly: false });

      const apiPayload: ServicePayload = {
        id: initialService?.id,
        service_name: serviceName,
        service_sub_title: subTitle,
        service_sub_decs: description,
        service_icon: serviceIcon,
        service_banner: serviceBanner,
        service_photo: servicePhoto,
        offers,
        why_us_list: whyUs,
        status,
      };

      const res = await submitService(apiPayload);

      if (res) {
        toast.success(
          initialService ? "Service updated successfully!" : "Service added successfully!"
        );

       resetForm();
  if (onSuccess) {
    onSuccess();   // ⬅️ re-fetch list
  }
  if (onCancel) {
    setTimeout(() => {
      onCancel();
    }, 1000);
        }
      }
    } catch (err: any) {
      if (err.inner) {
        const validationErrors: ServiceFormErrors = {};
        err.inner.forEach((e: any) => {
          if (e.path) {
            if (e.path.includes("offers") || e.path.includes("whyUsList")) {
              const [field, index, subField] = e.path
                .split(/\[|\].?/)
                .filter(Boolean);
              if (!validationErrors[field as "offers" | "whyUsList"])
                validationErrors[field as "offers" | "whyUsList"] = [];
              validationErrors[field as "offers" | "whyUsList"]![Number(index)] = {
                ...validationErrors[field as "offers" | "whyUsList"]![Number(index)],
                [subField]: e.message,
              };
            } else {
              validationErrors[e.path as keyof ServiceFormErrors] = e.message;
            }
          }
        });
        setErrors(validationErrors);
        toast.error("Form has errors!");
      }
    }
  };
  useEffect(() => {
    if (Iserror) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [Iserror]);

  return (
    <>
      <Toaster />
      <div ref={errorRef}>
        <ServiceHeading mode={initialService ? "edit" : "add"} />
        {onCancel && (
          <div className="flex items-center mt-10 ml-10 cursor-pointer" onClick={onCancel}>
            <ArrowLeft className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Back</span>
          </div>
        )}

        <form
          className="p-4 md:p-8 lg:p-10 xl:p-12 flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >

          {Iserror && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{Iserror}</span>
            </div>
          )}

          <div className="w-full max-w-[866px]">
            <label className="block text-sm font-medium text-primary mb-2">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter service name"
            />
            {errors.serviceName && (
              <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>
            )}
          </div>

          <ServiceImages
            setIcon={setServiceIcon}
            setBanner={setServiceBanner}
            setPhoto={setServicePhoto}
            errors={errors}
            initialIconUrl={initialService?.service_icon || null}
            initialBannerUrl={initialService?.service_banner || null}
            initialPhotoUrl={initialService?.service_photo || null}
          />

          <div className="w-full max-w-[866px] mt-8">
            <label className="block text-sm font-medium text-primary mb-2">
              Service Sub Title
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full px-4 py-2 border border-primary"
              placeholder="Enter sub title"
            />
            {errors.serviceSubTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.serviceSubTitle}</p>
            )}
          </div>

          <div className="w-full max-w-[866px]">
            <label className="block text-sm font-medium text-primary mb-2">
              Service Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-primary"
              placeholder="Enter description"
            />
            {errors.serviceSubDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.serviceSubDescription}
              </p>
            )}
          </div>

          <DynamicFields
            items={offers}
            setItems={setOffers}
            label="Offer"
            fieldErrors={errors.offers}
          />
          <DynamicFields
            items={whyUs}
            setItems={setWhyUs}
            label="Why Us"
            fieldErrors={errors.whyUsList}
          />

          <div className="w-full max-w-[866px] mt-4">
            <label className="block text-sm font-medium text-primary mb-2">
              Status
            </label>
            <div className="flex space-x-6">
              {["Active", "Inactive"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <span className="text-sm text-primary">{option}</span>
                  <input
                    type="radio"
                    name="status"
                    checked={status === option}
                    onChange={() => setStatus(option as "Active" | "Inactive")}
                    className="appearance-none w-4 h-4 border-2 border-primary rounded-full checked:bg-white checked:border-[5px] checked:border-primary focus:outline-none cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`bg-primary text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Saving..." : "Save Service"}
            </button>

            {onCancel && (
              <button
                type="button"
                disabled={loading}
                onClick={onCancel}
                className={`bg-white border border-primary text-primary px-10 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                Cancel
              </button>
            )}
          </div>

        </form>
      </div>
    </>
  );
};

export default AddEditServiceForm;
