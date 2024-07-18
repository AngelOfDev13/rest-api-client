import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductsById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export const loader = async ({ params }: LoaderFunctionArgs) => {
    if(params !== undefined) {
        const product = await getProductsById(Number(params.id))
        if(!product) {
            redirect('/')
        }
        return product
    }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos con obligatorios'
    }
    if(error.length){
        return error
    }

    if(params.id !== undefined) {
        await updateProduct(data, Number(params.id))
        // return null
        return redirect('/')
    }
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

const EditProduct = () => {

    const product = useLoaderData() as Product
    const error = useActionData() as string

    return(
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-white">
                    Editar Producto
                </h2>
                <Link to='/' className="rounded-md bg-emerald-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500">
                    Volver
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form 
                className="mt-10"
                method="POST">

                <ProductForm 
                    product={product} />

            <div className="mb-4">
                <label
                    className="text-white"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-slate-700 outline-none text-white"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

            <input
            type="submit"
            className="mt-5 w-full bg-emerald-600 hover:bg-emerald-500 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Guardar Cambios"
            />
        </Form>
        </>
    )
}

export default EditProduct