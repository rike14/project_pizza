"use server"
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/app";

export default async function CreateCategory(formData: FormData){
    const name = formData.get("name")

        if(name === ""){
            return;
        }

        const data = {
            name: name
        }

        const token = getCookieServer()

        const response = await api.post("category", data, {
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