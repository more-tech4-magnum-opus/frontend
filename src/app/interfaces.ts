export enum Roles{
    user, 
    admin, 
    hr
}
export enum Specialities{
    designer,
    frontend,
    backend,
    DevOps,
    smm,
}


export interface UserIE{
    wallet:string,
    id:number
    role:Roles
    balance: number,
    name:string,
}



export interface EmployerIE extends UserIE{
    jobTittle:Specialities,
    respect: number, 
}


export interface EventIE{
    name:string, 
    description: string,
    date: Date,
    time:Date,
    org: number;
    visitors: number[]
}

export interface ProductIE{
    name:string,
    description:string,
    image: string,
    cost: number,
    id: number,
}

export enum SortTypes{
    sortByPriceSmaller,
    sortByPriceBigger,
    sortByLetter 
}

export interface Market{
    sortType: SortTypes,
    products: ProductIE[],
}
