import {
    Header,
} from "../../features/admin-profile";
import FetchProfile from "../../features/admin-profile/components/FetchProfile";

const Profile = () => {
    return (
        <div className="flex flex-1 flex-col w-full pb-[0px] pl-[17px] pr-[0px]  bg-gray-50
                    sm:pl-[17px] sm:pr-[0px] sm:pb-[0px] 
                    md:pl-[17px] md:pr-[17px] md:pb-[0px]
                    lg:pl-[17px] lg:pr-[17px] lg:pb-[0px] 
                    xl:pl-[40px] xl:pr-[40px]
                    text-sm sm:text-base md:text-md lg:text-lg xl:text-xl 
                    ">
            <Header />
            <FetchProfile />
        </div>
    );
}
export default Profile;