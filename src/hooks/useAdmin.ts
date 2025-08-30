import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setError, setLoading } from "../store/adminAuthSlice";
import type { RootState } from "@/store";
import { useLocation } from "react-router-dom";


export const useAdmin = () => {
    const dispatch = useDispatch();
    const { admin, loading, checked } = useSelector((state: RootState) => state.admin);
    const { pathname } = useLocation()

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {
                console.log("checking admin..")
                // const res = await api.get("/me/", { withCredentials: true });

                // const data = res.data;
                // if (data) {
                //     dispatch(setAdmin(data));
                // }
                // else {
                //     throw Error("Unauthorised")
                // }

                await new Promise((res) => {
                    setTimeout(res, 3000);
                });

                dispatch(setAdmin(

                    {
                        id: 1,
                        first_name: "admin",
                        last_name: "adm",
                        email: "admin@gmail.com"
                    }
                    // null
                ));

            } catch (err: any) {
                dispatch(setAdmin(null));
                dispatch(setError(err.response?.data?.message || "Not authenticated"));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (!checked && pathname.includes("admin")) {
            checkAuth()
        }
    }, []);

    return { admin, loading, checked };
};