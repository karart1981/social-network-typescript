export interface IUser {
    id: string
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string
}


export type InputUser = Omit<IUser, 'id' | 'isPrivate' | 'cover' | 'picture'>

export type ILogin = Omit<InputUser, 'name' | 'surname'>

export interface IResponse {
    status: string
    message?: string
    payload?: unknown
    user?: IWideUser
}


export interface IWideUser extends IUser{
    followers: IUser[]
    following: IUser[]
}

export interface IConnection {
    following: boolean
    followsMe: boolean
    requested: boolean
    blockedMe?: boolean
    didIBlock: boolean
    amIBlocked?: boolean
}


export interface IAccount extends IWideUser {
    available: boolean
    connection: IConnection
    posts: IPost[]
}

export interface IContextType {
    account: IWideUser
    setAccount: (user: IWideUser) => void
}

export interface IChangePwd {
    old: string
    newpwd: string
}

export interface IPost {
    id: number
    title: string
    picture: string
    likes: IUser[]
    isLiked?: boolean
    comments: IComment[]
    userId: string
    hashtags?: string[]
}


export interface IRequest {
    id: number
    user: IUser
}


export interface IComment {
    content: string
    id: number
    user: {
        id: string
        name: string
        picture: string
        surname: string
    }
}

export interface IHash {
    id: number
    picture: string
    title: string
    userId: number
}