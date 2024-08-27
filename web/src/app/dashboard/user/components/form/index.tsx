"use server"
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/app";

export default async function CreateUser(formData: FormData){
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

        if(name === "" || email === "" || password === ""){
            return;
        }

        const data = {
            name: name,
            email: email,
            password: password
        }

        const token = getCookieServer()

        const response = await api.post("users", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .catch((error) => {
                console.log(error)
                return;
            }) 
            
        return response?.data
}