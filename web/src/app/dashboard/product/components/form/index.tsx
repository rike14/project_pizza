"use client"
import { Button } from '@/app/dashboard/components/button';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/app';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import styles from './styles.module.scss';

interface CategoryProps {
  id: string
  name: string
}

interface Props {
  categories: CategoryProps[]
}

export default function Form({categories}: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")

  async function handleCreateProduct(formData: FormData) {
      const categoryIndex = formData.get("category")
      const name = formData.get("name")
      const price = formData.get("price")
      const description = formData.get("description")

      if(!categoryIndex || !name || !price || !description || !image){
        toast.warning("Fill in all fields")
        return;
      }

      const data = new FormData()
      
      data.append("name", name)
      data.append("price", price)
      data.append("description", description)
      data.append("category_id", categories[Number(categoryIndex)].id)
      data.append("file", image)
      
      const token = getCookieClient();
      
      await api.post('/product', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to register product")
        return
      })

      toast.success("Product registered successfully!")
      router.push("/dashboard")
    
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image.type !== "image/jpeg" && image.type !== "image/png"){
        toast.warning("File format not allowed")
        return
      }

      setImage(image)
      setPreviewImage(URL.createObjectURL(image))
    }

  }

  return (
    <main className={styles.container}>
      <h1 className={styles.form}>New Product</h1>
      <form 
        action={handleCreateProduct}
        className={styles.form}
      >
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} />
          </span>
          
          <input 
            type='file'
            accept='image/png, image/jpeg'
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image 
              alt='Product preview'
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select 
          name='category'
        >
          {categories.map((category, index) => (
            <option
              key={category.id}
              value={index}
            >
              {category.name}
            </option>
          ))

          }
        </select>
        
        <input 
          type='text'
          name='name'
          placeholder='Write product name...'
          required
          className={styles.input}
        />

        <input 
          type='text'
          name='price'
          placeholder='Write product price...'
          required
          className={styles.input}
        />

        <textarea
          className={styles.input}
          placeholder='Write a product description'
          name='description'
          required
        >
        </textarea>

        <Button 
          name='Create product'
        />

      </form>
    </main>
  )
}