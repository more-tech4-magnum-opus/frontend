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
    role:string
    balance: number,
    name:string,
}



export interface EmployerIE extends UserIE{
    jobTittle:string,
    respect: number, 
    telegramID: string,
    command: string,
    clan:string,
    money:number,
}

export interface HRIE extends UserIE{
    respect:number,
    command:number,
    telegram: string,
}

export interface EventIE{
    name:string, 
    about: string,
    starts: string,
    slug:string,
    creator:HRIE,
    image:string,
    planning:number,
    attended:number
}

export interface EventAttendence{
    id:number,
    event_slug:string,
    worker_username:string,
    attended:boolean
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