import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { safeParse, pipe, parse, transform, unknown  } from "valibot"
import axios from "axios"
import { toBoolean } from "../helpers";


type dataTypes = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: dataTypes ) => {

    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }

    } catch(error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)

        if(result.success) {
            return result.output

        } else {
            throw new Error('Hubo un error')
        } 

    } catch(error) {
        console.log(error)
    }
}

export const getProductsById = async (id : Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)

        if(result.success) {
            return result.output

        } else {
            throw new Error('Hubo un error')
        } 

    } catch(error) {
        console.log(error)
    }
}

export const updateProduct = async (data: dataTypes, id: Product['id']) => {
    try {
        const NumberSchema = pipe(unknown(), transform(Number));

        const result = safeParse(ProductSchema, {
            id, 
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        
    }
}

export const updateAvailability = async (id : Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        
    }
} 