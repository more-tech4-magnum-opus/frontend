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
    role:Roles
    balance: number,
    name:string,
}



export interface EmployerIE extends UserIE{
    jobTittle:string,
    respect: number, 
    telegramID: string,
    command: string,
    clan:string
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
    id: string,
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

export interface ClanIE{
    name:string, 
    users:UserIE[]
}