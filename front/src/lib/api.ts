import axios from "axios";
import { IChangePwd, ILogin, InputUser, IResponse } from "./types";

const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const handleSignup = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post('/signup', user)

    return response.data
}

export const handleLogin = async (user: ILogin): Promise<IResponse> => {
    const response = await Axios.post('/login', user)

    return response.data
}

export const handleVerify = async (): Promise<IResponse> => {
    const response = await Axios.get('/verify')

    return response.data
}

export const handlelogout = async (): Promise<IResponse> => {
    const response = await Axios.post('/logout')

    return response.data
}

export const handleChangePwd = async (data: IChangePwd): Promise<IResponse> => {
    const response = await Axios.patch('/update/password', data)

    return response.data
}

export const handleChangeLog = async (data: ILogin): Promise<IResponse> => {
    const response = await Axios.patch('/update/login', data)

    return response.data
}

export const handlePictureUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch('profile/upload', data)

    return response.data
}

export const handleCoverUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch('/cover/upload', data)

    return response.data
}

export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get('/posts')

    return response.data
}

export const handlePostCreation = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.post('/posts', data)

    return response.data
}

export const handleSearch = async (text: string): Promise<IResponse> => {
    const response = await Axios.get(`/search/${text}`)

    return response.data
}

export const handleSetPrivacy = async (): Promise<IResponse> => {
    const response = await Axios.patch('account/set')

    return response.data
}

export const handleGetAccount = async (id: string | undefined): Promise<IResponse> => {
    const response = await Axios.get(`/account/${id}`)

    return response.data
}

export const handleSendFollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post(`/account/follow/${id}`)

    return response.data
}

export const handleUnfollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post(`/account/unfollow/${id}`)

    return response.data
}

export const handleCancelRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.delete(`/request/cancel/${id}`)

    return response.data
}

export const handleRequests = async (): Promise<IResponse> => {
    const response = await Axios.get(`/requests`)

    return response.data
}

export const handleAccept = async (id: number): Promise<IResponse> => {
    const response = await Axios.patch(`/requests/accept/${id}`)

    return response.data
}

export const handleDecline = async (id: number): Promise<IResponse> => {
    const response = await Axios.patch(`/requests/decline/${id}`)

    return response.data
}

export const handlePostReaction = async (id: number): Promise<IResponse> => {
    const response = await Axios.post(`/posts/react/${id}`)

    return response.data
}

export const handleGetPostData = async (id: number): Promise<IResponse> => {
    const response = await Axios.get(`/posts/${id}`)

    return response.data
} 

export const handleBlockUser = async (id: string): Promise<IResponse> => {
    const response = await Axios.post(`/block/${id}`)

    return response.data
}

export const handleDeletePost = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete(`/posts/${id}`)

    return response.data
}

export const handleAddComment = async (text: string, id: number): Promise<IResponse> => {
    const response = await Axios.post(`/posts/comment/${id}`, { text })

    return response.data
}

export const handleRemoveComment = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete(`/posts/comment/${id}`)

    return response.data
}

export const handleGetFollowers = async (): Promise<IResponse> => {
    const response = await Axios.get(`/followers`)

    return response.data
}

export const handleGetFollowing = async (): Promise<IResponse> => {
    const response = await Axios.get(`/following`)

    return response.data
}

export const handleGetHashtag = async (hash: string): Promise<IResponse> => {
    const response = await Axios.get(`/hashtag/${hash}`)

    return response.data
}