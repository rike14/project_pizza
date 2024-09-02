"use client"
import Loading from "@/app/components/loading/loading";
import { api } from "@/services/app";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, useState } from "react";
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';
import { Button } from "../dashboard/components/button";
import { toast } from "sonner";
import Spinner from "../components/spinner";
import { TriangleAlertIcon } from "lucide-react";

export default function Signup(){
    const [loading, setLoading] = useState(false)

    async function handleSignup(formData: FormData){
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if(name === "" || email === "" || password === ""){
            return
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })

            toast.success("User created successfully!")

        } catch (error) {
            let errorMessage = error.response.data.error ?? 'Error, something went wrong!';
            toast(errorMessage, {
                icon: <TriangleAlertIcon />,
                style: {
                    color: "var(--warning)"
                }
            })
            return;
        }

        redirect("/")
    }

    function handleSignIn(){
        setLoading(true)
    }

    return(
        <>
            <Suspense fallback={<Loading />}>
                <div className={styles.containerCenter}>
                    <Image
                        src={logoImg}
                        alt="Logo image"
                    />

                    <section className={styles.login}>
                        <h1>Signup your account</h1>
                        <form action={handleSignup}>
                            <input 
                                type='text'
                                required
                                name='name'
                                placeholder='Write your name'
                                className={styles.input}
                            />

                            <input 
                                type='email'
                                required
                                name='email'
                                placeholder='Write your email'
                                className={styles.input}
                            />

                            <input 
                                type='password'
                                required
                                name='password'
                                placeholder='***********'
                                className={styles.input}
                            />
                            
                            <Button
                                name='Signup'
                            />
                        </form>

                         <div>
                            {loading ? <Spinner /> : 
                                <Link href="/" className={styles.text} onClick={handleSignIn}>
                                    Do you have an account? Signin
                                </Link>
                            }
                        </div>
                       
                    </section>
                </div>
            </Suspense>
        </>
    )
}