"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

const Loginpage = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth, 
                email, 
                password
            );
            const user = userCredential.user;

            if (user.emailVerified) {
                const regrestrationData = localStorage.getItem("registrationData");
                const {
                    firstName,
                    lastName,                    
                }= regristrationData ? JSON.parse(regrestrationData) : {};
        }

    };

    return (
        <div className="bg gardient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col h-screen relative">
           <h2 className="text-2xl font-bold text-center mb-10">Login</h2>
           <div className="p-5 border border-gray-300 rounded ">
           <form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">

               <div className="flex space-x-4">
                <div className="w-1/2">
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    First Name</label>
                <input type="email"
                id="email"
                placeholder="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required className="border 2 outline-none sm:text-sm rounded-Lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
               </div>

               <div className="flex space-x-4">
                <div className="w-1/2">
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                    password</label>
                <input type="password" 
                id="password" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required className="border 2 outline-none sm:text-sm rounded-Lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
               </div>

               {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
               {message && <p className="text-green-500 text-sm font-medium">{message}</p>}
               <button
                type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign in
               </button>
               </form>
               </div>
               </div>

    )}
