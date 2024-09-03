import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => Promise<void>
    loading: boolean
}

type UserProps = {
    id: string
    email: string
    name: string
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        email: '',
        name: '',
        token: ''
    })

    const [loading, setLoading] = useState(true)

    const isAuthenticated = !!user.name

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem("@sujeitopizzaria")

            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token,
                })

            }

            setLoading(false)
        }

        getUser()
    }, [])

    async function signIn({email, password}: SignInProps) {
        setLoading(true)

        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const {id,name, token} = response.data

            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))
            
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token
            })

            setLoading(false)

            Toast.show({
                type: 'success',
                text1: `Login successfully!`,
                text2: `Welcome ${name}`,
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });

        } catch (error) {
            setUser({
                id: '',
                email: email,
                name: '',
                token: ''
            })
            console.log(error)
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email or password is wrong! ❌',
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });
        }
        
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                email: '',
                name: '',
                token: ''
            })
        })
        Toast.show({
            type: 'success',
            text1: 'Bye bye!',
            text2: 'Logout successfully 🔚',
            text1Style: {
                fontSize: 18
            },
            text2Style: {
                fontSize: 16
            }
        });
    }

    return (
        <AuthContext.Provider 
            value={{
                user, 
                isAuthenticated, 
                signIn, 
                signOut,
                loading 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}