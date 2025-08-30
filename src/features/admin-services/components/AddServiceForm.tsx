import { Plus, Trash2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useServiceForm } from "../hooks/useServiceForm";
import ServiceImages from "./ServiceImages";

const AddServiceForm = () => {
  const {
    serviceName, setServiceName,
    serviceSubTitle, setServiceSubTitle,
    serviceSubDescription, setServiceSubDescription,
    offers, setOffers, addOffer, removeOffer,
    whyUsList, setWhyUsList, addWhyUs, removeWhyUs,
    status, setStatus,
    setServiceIcon,
    setServiceBanner,
    setServicePhoto,
    serviceIconPreview, setServiceIconPreview,
    serviceBannerPreview, setServiceBannerPreview,
    servicePhotoPreview, setServicePhotoPreview,
    handleImageChange,
    handleSubmitForm,
    handleCancel,
    errors,
    validateField 
  } = useServiceForm();

  return (
    <>
      <Toaster />
      <form className="p-4 md:p-8 lg:p-10 xl:p-12" onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-6">
          {/* Service Name */}
          <div className="w-full max-w-[866px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
                validateField("serviceName", e.target.value);
              }}
              className="w-full px-4 py-2 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.serviceName && (
              <span className="text-red-500 text-sm">{errors.serviceName}*</span>
            )}
          </div>

          {/* service images */}
          <ServiceImages
            serviceIconPreview={serviceIconPreview}
            setServiceIconPreview={setServiceIconPreview}
            serviceBannerPreview={serviceBannerPreview}
            setServiceBannerPreview={setServiceBannerPreview}
            servicePhotoPreview={servicePhotoPreview}
            setServicePhotoPreview={setServicePhotoPreview}
            handleImageChange={(e, setFile, setPreview) =>  handleImageChange(e, setFile, setPreview, e.target.id) }
            setServiceIcon={setServiceIcon}
            setServiceBanner={setServiceBanner}
            setServicePhoto={setServicePhoto}
            errors={errors}
          />

          {/* Service Sub Title */}
          <div className="w-full max-w-[866px] mt-15">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Sub Title</label>
            <input
              type="text"
              value={serviceSubTitle}
              onChange={(e) => {
                setServiceSubTitle(e.target.value);
                validateField("serviceSubTitle", e.target.value);
              }}
              className="w-full px-4 py-2 border border-primary"
            />
            {errors.serviceSubTitle && (
              <span className="text-red-500 text-sm">{errors.serviceSubTitle}*</span>
            )}
          </div>

          {/* Service Sub Description */}
          <div className="w-full max-w-[866px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Sub Description</label>
            <textarea
              rows={5}
              value={serviceSubDescription}
              onChange={(e) => {
                setServiceSubDescription(e.target.value);
                validateField("serviceSubDescription", e.target.value);
              }}
              className="w-full px-4 py-2 border border-primary"
            />
            {errors.serviceSubDescription && (
              <span className="text-red-500 text-sm">{errors.serviceSubDescription}*</span>
            )}
          </div>

          {/* what we Offers  */}
          {offers.map((offer, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-6 flex-wrap mt-4">
              <div className="w-full sm:max-w-[256px] lg:max-w-[405px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What We Offer Heading
                </label>
                <input
                  type="text"
                  value={offer.heading}
                  onChange={(e) => {
                    const updated = [...offers];
                    updated[index].heading = e.target.value;
                    setOffers(updated);
                    validateField(`offers[${index}].heading`, e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-primary"
                />
                {errors[`offers[${index}].heading`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`offers[${index}].heading`]}*
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start w-full sm:max-w-[256px] lg:max-w-[405px] xl:ml-10 gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What We Offer Description
                  </label>
                  <textarea
                    rows={4}
                    value={offer.description}
                    onChange={(e) => {
                      const updated = [...offers];
                      updated[index].description = e.target.value;
                      setOffers(updated);
                      validateField(`offers[${index}].description`, e.target.value);
                    }}
                    className="w-full px-4 py-2 border border-primary"
                  />
                  {errors[`offers[${index}].description`] && (
                    <span className="text-red-500 text-sm">
                      {errors[`offers[${index}].description`]}*
                    </span>
                  )}
                </div>

                {offers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOffer(index)}
                    className="bg-red-500 text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {index === offers.length - 1 && offers.length < 6 && (
                  <button
                    type="button"
                    onClick={addOffer}
                    className="bg-primary text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Why Us */}
          {whyUsList.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-6 flex-wrap mt-4">
              <div className="w-full sm:max-w-[256px] lg:max-w-[405px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why Us Heading
                </label>
                <input
                  type="text"
                  value={item.heading}
                  onChange={(e) => {
                    const updated = [...whyUsList];
                    updated[index].heading = e.target.value;
                    setWhyUsList(updated);
                    validateField(`whyUsList[${index}].heading`, e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-primary"
                />
                {errors[`whyUsList[${index}].heading`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`whyUsList[${index}].heading`]}*
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start w-full sm:max-w-[256px] lg:max-w-[405px] xl:ml-10 gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why Us Description
                  </label>
                  <textarea
                    rows={4}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...whyUsList];
                      updated[index].description = e.target.value;
                      setWhyUsList(updated);
                      validateField(`whyUsList[${index}].description`, e.target.value);
                    }}
                    className="w-full px-4 py-2 border border-primary"
                  />
                  {errors[`whyUsList[${index}].description`] && (
                    <span className="text-red-500 text-sm">
                      {errors[`whyUsList[${index}].description`]}*
                    </span>
                  )}
                </div>

                {whyUsList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWhyUs(index)}
                    className="bg-red-500 text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {index === whyUsList.length - 1 && whyUsList.length < 6 && (
                  <button
                    type="button"
                    onClick={addWhyUs}
                    className="bg-primary text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Status */}
          <div className="w-full max-w-[866px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Active</span>
                <input
                  className="appearance-none w-4 h-4 border-2 border-primary rounded-full 
                  checked:bg-white checked:border-[5px] checked:border-primary focus:outline-none cursor-pointer"
                  type="radio"
                  value="active"
                  checked={status === "active"}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    validateField("status", e.target.value);
                  }}
                />
              </label>
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Inactive</span>
                <input
                  className="appearance-none w-4 h-4 border-2 border-primary rounded-full 
                  checked:bg-white checked:border-[5px] checked:border-primary focus:outline-none cursor-pointer"
                  type="radio"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    validateField("status", e.target.value);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
              Save Service
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white border border-primary text-gray-700 px-10 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddServiceForm;
