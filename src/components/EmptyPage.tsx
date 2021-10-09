interface IDetail {
    params: {
       id: string
    }
}
export const EmptyPage=({ match }: { match: IDetail })=>{
    return(
        <div/>
    )
}
