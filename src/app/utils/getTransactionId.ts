export const getTransactionId = ()=>{
    return `tran-${Math.round(Math.random()*1000)}-${Date.now()}`
}