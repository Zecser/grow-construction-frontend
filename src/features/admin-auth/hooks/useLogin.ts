import { useState } from "react";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginFormValues) => {
        try {
            setLoading(true);
            setError(null);

            await new Promise((res) => setTimeout(res, 2000));

            if (data.email === "admin@gmail.com") {
                throw new Error("Invalid credentials");
            }

            console.log("Logged in:", data);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
