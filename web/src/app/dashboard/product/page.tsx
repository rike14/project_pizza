import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/app";
import Form from "./components/form";

export default async function Product(){

    const token = getCookieServer()

    const response = await api.get('/category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return(
        <Form  categories={response.data}/>
    )
}