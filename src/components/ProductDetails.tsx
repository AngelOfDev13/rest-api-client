import { formatCurrency } from "../helpers"
import { deleteProduct } from "../services/ProductService"
import { Product } from "../types"
import { useNavigate, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Form } from "react-router-dom"

type ProductProps = {
    product: Product
}

export const action = async ({ params }: ActionFunctionArgs) => {

    if( params.id !== undefined) {

        await deleteProduct(Number(params.id))  
        return redirect('/')
    }

}


const ProductDetails = ({ product }: ProductProps) => {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    return(
        <tr className="">
        <td className="p-3 text-lg text-white">
            {product.name}
        </td>
        <td className="p-3 text-lg text-white">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-white">
            <fetcher.Form 
                method="POST"
            >
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${product.availability ? 'text-emerald-600' : 'text-rose-600'} 
                    rounded-lg p-2 text-xs font-bold w-full uppercase border border-gray-100 hover:cursor-pointer hover:bg-slate-400`}
                    >
                    {product.availability ? 'Disponible' : 'No disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-white ">
           <div className="flex gap-2 items-center">
            <button
                onClick={() => navigate(`/productos/${product.id}/editar`)} 
                className="rounded-md bg-emerald-600 p-2 font-bold text-white shadow-sm hover:bg-emerald-500 w-full text-center text-xs">
                Editar
            </button>

            <Form
                className="w-full"
                method="POST"
                action={`/productos/${product.id}/eliminar`}
                onSubmit={(e) => {
                    if(!confirm('¿Seguro que desea eliminar el producto?') ) {
                        e.preventDefault()
                    }
                }}
                >
                <input 
                    type="submit"
                    value={'Eliminar'}
                    className="rounded-md bg-rose-600 p-2 font-bold text-white shadow-sm hover:bg-rose-500 w-full text-center text-xs"
                     />
            </Form>
           </div>
        </td>
    </tr> 
    )
}

export default ProductDetails