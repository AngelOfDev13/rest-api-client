import { ReactNode } from "react"

type chlidrenProp = {
    children: ReactNode
}

const ErrorMessage = ({children} : chlidrenProp) => {
    return(
        <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
            {children}
        </div>
    )
}

export default ErrorMessage