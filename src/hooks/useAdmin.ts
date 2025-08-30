import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setError, setLoading, type AdminType } from "../store/adminAuthSlice";
import type { RootState } from "@/store";
import { useLocation } from "react-router-dom";

import api from "@/lib/api";


export const baseURL = import.meta.env.VITE_API_URL || "";

export const useAdmin = () => {
    const dispatch = useDispatch();
    const { admin, loading, checked } = useSelector((state: RootState) => state.admin);
    const { pathname } = useLocation()

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(setLoading(true));
            try {
                console.log("checking admin..")
                const res = await api.get("/me/", { withCredentials: true });

                const data: AdminType = res.data;

                if (data) {
                    dispatch(setAdmin(data));
                }
                else {
                    throw Error("Unauthorised")
                }

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