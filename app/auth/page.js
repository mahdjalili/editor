"use client";

import { useState } from "react";

import { Login } from "./_components/Login";
import { Register } from "./_components/Register";

export default function Page() {
    const [step, setStep] = useState("login");

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
            {step === "login" ? <Login /> : <Register />}
            <a className="text-sm text-gray-500" onClick={() => setStep(step === "login" ? "register" : "login")}>
                {step === "login" ? "ثبت نام" : "ورود"}
            </a>
        </div>
    );
}
