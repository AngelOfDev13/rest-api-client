export const formatCurrency = (amount: number) => {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const toBoolean = (str: string) => { 
    return str.toLowerCase() === 'true'
    
}   