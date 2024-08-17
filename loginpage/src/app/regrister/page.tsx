"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "./app/firebase/firebase";

const Registerpage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;

        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await sendEmailVerification(user);

            localStorage.setItem("regrestrationData", JSON.stringify(
                firstName,
                lastName,
                email,
            ));

            setMessage("Registration successful pleaer check your email verification");

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }   
        catch (error) {
            if (error instanceof Error) {    
                setError(error.message);
            }else{
                setError("Unknown error");
            }
        }
    };

    return (
        <div className="bg gardient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col h-screen relative">
           <h2 className="text-2xl font-bold text-center mb-10">Register</h2>
           <div className="p-5 border border-gray-300 rounded ">
           <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
               <div className="flex space-x-4">
                <div className="w-1/2">
                <label htmlFor="firstName" className="text-sm font-medium block mb-2 text-gray-300">
                    First Name</label>
                <input type="text" 
                id="firstName" 
                placeholder="First Name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                required className="border 2 outline-none sm:text-sm rounded-Lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
               </div>

               <div className="flex space-x-4">
                <div className="w-1/2">
                <label htmlFor="lastName" className="text-sm font-medium block mb-2 text-gray-300">
                    Last Name</label>
                <input type="text" 
                id="lastName" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
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

               <div className="flex space-x-4">
                <div className="w-1/2">
                <label htmlFor="confirmPassword" className="text-sm font-medium block mb-2 text-gray-300">
                confirmPassword</label>
                <input type="password" 
                id="confirmPassword" 
                placeholder="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required className="border 2 outline-none sm:text-sm rounded-Lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                </div>
               </div>
               {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
               {message && <p className="text-green-500 text-sm font-medium">{message}</p>}
               <button
                type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign up
               </button>
               </form>
               </div>
               </div>

    )}
