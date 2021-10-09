
interface ICompany{
    name:string
    catchPhrase:string
    bs:string

}

interface IGeo{
    lat:string
    lng:string
}

interface IAddress{
    street:string
    suite:string
    city:string
    zipcode:string
    geo:IGeo
}

export interface IData{
    id:number
    name:string
    email:string
    address:IAddress
    company:ICompany
    phone:string
    website:string
}
export interface IRow{
    row:{
        original:IData
    }
}
