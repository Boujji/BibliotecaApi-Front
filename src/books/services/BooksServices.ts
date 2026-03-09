import axiosClient from '@/lib/axios'
import type { Libro, PostLibroDto, PutLibroDto, ApiResponse } from '@/types'

export const booksService = {
    getBooks:  () => axiosClient.get<ApiResponse<Libro[]>>('api/libro') ,
    getBookById: (id: string) => axiosClient.get<ApiResponse<Libro>>(`api/libro/${id}`) ,
    postbook: (dto: PostLibroDto) => axiosClient.post<ApiResponse<Libro>>('api/libro', dto) ,
    putbook: (id: string, dto: PutLibroDto) => axiosClient.put<ApiResponse<Libro>>(`api/libro/${id}`, dto) ,
    }    

