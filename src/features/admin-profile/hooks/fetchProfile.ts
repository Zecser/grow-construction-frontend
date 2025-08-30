import { useState, useEffect } from "react";

export interface UserProfile {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    postalCode: string;
    taxId: string;
    role: string;
    email: string;
    city: string;
    photo: string;
}

export const useFetchProfile = () => {
    const [user, setUser] = useState<UserProfile>({
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        postalCode: "",
        taxId: "",
        role: "",
        email: "",
        city: "",
        photo: "/images/profile-image.png",
    });

    useEffect(() => {
        const storedData = localStorage.getItem("userProfile");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUser((prev) => ({
                ...prev,
                ...parsedData,
                photo: parsedData.photo || parsedData.profileImg || "/images/profile-image.png",
            }));
        } else {
            const defaultData: UserProfile = {
                firstName: "David",
                lastName: "Spencer",
                phone: "0987775543",
                country: "United Kingdom",
                postalCode: "067845",
                taxId: "56100",
                email: "aaaaaaassssdavidbbba@gmail.com",
                city: "Amstrdam",
                role: "Ceo",
                photo: "/images/profile-image.png",
            };
            setUser(defaultData);
            localStorage.setItem("userProfile", JSON.stringify(defaultData));
        }
    }, []);

    return { user, setUser };
};
