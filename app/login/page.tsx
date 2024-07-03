"use client";
import React, { useState } from "react";
import { supabase } from "../lib/initSupabase";

const LoginPage = () => {
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTokenSent, setIsTokenSent] = useState<boolean>(false);

    const authenticateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailAddress) {
            alert("Email address is required");
            return;
        }

        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithOtp({
            email: emailAddress,
            options: {
                emailRedirectTo: window.location.origin,
            },
        });

        if (error) {
            console.error(error);
            throw new Error("Something went wrong");
        }

        if (data) {
            setIsTokenSent(true);
            setTimeout(() => {
                setIsTokenSent(false); // show the login ui after 5 seconds
                setIsLoading(false);
            }, 5000);
        }
    };

    return (
        <div className="flex flex-col justify-evenly items-center min-h-screen w-full bg-slate-100">
            <h1 className="text-2xl font-bold">FloatingBoard</h1>
            <form
                onSubmit={authenticateUser}
                className="flex flex-col gap-3 justify-center items-center w-[35vw] mx-auto"
            >
                <label>Login with magic link 🧙🏽‍♂️</label>
                <input
                    type="text"
                    placeholder="Enter email address"
                    className="border border-slate-200 w-full px-3 py-2 rounded-lg"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                />
                <button
                    type="submit"
                    className="px-3 py-2 bg-slate-900 text-white rounded-lg text-base w-full"
                    disabled={isTokenSent || isLoading}
                >
                    {isTokenSent
                        ? "Token sent...please check your email address"
                        : isLoading
                        ? "One moment please..."
                        : "Send magic link"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
