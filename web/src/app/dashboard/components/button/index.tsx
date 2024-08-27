"use client"
import { useFormStatus } from 'react-dom'
import styles from './styles.module.scss'

interface Button {
    name: string
}

export function Button({name}: Button){
    const { pending } = useFormStatus()
    
    return(
        <>
            <button
            type='submit' 
            className={styles.button}
            disabled={pending}
            >
                {name}
            </button>
        </>
    )
}