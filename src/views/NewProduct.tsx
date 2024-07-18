import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export const action = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos con obligatorios'
    }
    if(error.length){
        return error
    }

    await addProduct(data)
    // return null
    return redirect('/')
}

const NewProduct = () => {

    const error = useActionData() as string

    return(
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-white">
                    Registrar Producto
                </h2>
                <Link to='/' className="rounded-md bg-emerald-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500">
                    Volver
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form 
                className="mt-10"
                method="POST">
                    
                    <ProductForm />
            {/* <div className="mb-4">
                <label
                    className="text-white"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-slate-700 outline-none text-white"
                    placeholder="Nombre del Producto"
                    name="name"
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-white"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-slate-700 outline-none text-white"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                />
            </div> */}
            <input
            type="submit"
            className="mt-5 w-full bg-emerald-600 hover:bg-emerald-500 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
        </Form>
        </>
    )
}

export default NewProduct