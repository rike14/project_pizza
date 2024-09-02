"use client"
import { useFormStatus } from 'react-dom'
import styles from './styles.module.scss'
import Spinner from '@/app/components/spinner'
import { toast } from 'sonner'

interface Button {
    name: string
}

export function Button({name}: Button){
    const { pending } = useFormStatus()
    
    return(
        <>
            
            {pending ? <Spinner /> :
                <button
                    type='submit' 
                    className={styles.button}
                    disabled={pending}
                >
                    {name}
                </button>
            }
        </>
    )
}