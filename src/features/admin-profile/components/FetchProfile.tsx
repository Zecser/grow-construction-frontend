import { useNavigate } from "react-router-dom";
import { useFetchProfile } from "../hooks/fetchProfile";
import { deleteLocalStorage } from "@/utils/helpers/localStorage";
const InfoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 gap-x-10 sm:gap-8 lg:gap-x-24 lg:gap-y-8 animate-pulse">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

const FetchProfile = () => {
  const navigate = useNavigate();
  const { user, loading } = useFetchProfile();

  const handleLogOut = () => {
    deleteLocalStorage("accessToken");
    deleteLocalStorage("refreshToken");
    navigate(0);
  };
  const handleEditProfile = () =>
    navigate("/admin/profile/edit", { state: { user } });
  const handleResetPassword = () => navigate("/admin/profile/reset-password");

  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-3 lg:p-8">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col xl:flex-row items-start xl:items-start gap-6 xl:gap-12 ">
          {/* Profile Section */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-6 sm:gap-6 sm:mb-8 lg:gap-10 lg:mb-12">
              {/* Profile Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-pink-300 flex-shrink-0">
                <img
                  src={
                    user.profile_picture
                      ? typeof user.profile_picture === "string"
                        ? user.profile_picture
                        : URL.createObjectURL(user.profile_picture)
                      : "/images/dummy.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/dummy.png";
                  }}
                />
              </div>

              {/* Name & Role */}
              <div>
                <h1 className="font-medium  capitalize mb-1 text-sm sm:text-base md:text-lg lg:text-xl">
                  {user.first_name} {user.last_name}
                </h1>
                <h3 className="font-normal capitalize text-sm sm:text-base md:text-lg lg:text-xl">
                  {user.role}
                </h3>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl capitalize mb-4 lg:mb-6">
              Personal Information
            </h1>

            {/* Information */}
            {loading ? (
              <InfoGridSkeleton />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 gap-x-10 sm:gap-8 lg:gap-x-24 lg:gap-y-8">
                {[
                  { label: "First Name", value: user.first_name },
                  { label: "Last Name", value: user.last_name },
                  { label: "Phone", value: user.phone },
                  { label: "Country", value: user.country },
                  { label: "Postal Code", value: user.postal_code },
                  { label: "Tax Id", value: user.tax_id },
                  { label: "Email", value: user.email },
                  { label: "City", value: user.city },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="font-medium text-xs sm:text-sm lg:text-lg text-gray-500 capitalize">
                      {item.label}
                    </div>
                    <div className="font-small text-xs sm:text-sm lg:text-lg truncate">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="w-50 sm:w-50 md:w-full lg:w-full xl:w-100 md:gap-2 md:flex-row lg:flex-row xl:flex-col self-center flex flex-col gap-2 pr-5 sm:gap-2 lg:gap-6 xl:pt-16 xl:p-6 xl:mt-[30px] xl:ml-0 md:pb-20 md:pt-10 lg:pb-20 lg:pt-10 md:l-0 ">
            {[
              { text: "Edit Profile", onClick: handleEditProfile },
              { text: "Reset Password", onClick: handleResetPassword },
              { text: "Log Out", onClick: handleLogOut },
            ].map((btn, idx) => (
              <button
                key={idx}
                className="w-full bg-white text-primary font-semibold text-xs sm:text-sm md:text-base lg:text-md py-2 sm:py-3 rounded-2xl shadow hover:shadow-md transition-all duration-200"
                onClick={btn.onClick}
              >
                {btn.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchProfile;
