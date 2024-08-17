"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";

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
           