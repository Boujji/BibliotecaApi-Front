export interface LoginDto {
  eMail: string
  Password: string
}

export interface ChangePasswordDto {
    PasswordActual: string
    PasswordNueva: string
}

export interface AuthUser {
  Id: string
  eMail: string
  Name: string
  Rol: number
}

export interface LoginResponse extends AuthUser {
  accessToken: string
  refreshToken: string
}

export interface Usuario {
  Id: string
  eMail: string
  FechaRegistro: string
  Name: string
  PenalizacionPendiente: number
  DescNextPrest: number
}

export interface PostUsuarioDto {
  eMail: string
  Name: string
  Password: string
}

export interface PutUsuarioDto {
  eMail: string
  Name: string
  PenalizacionPendiente: number
  DescNextPrest: number
}

export interface UsuarioMorosoDto {
    name: string
    ScoreMorosidad: number
    DiasRetraso: number
}

export interface Libro {
  Id: string
  Titulo: string
  Categoria: string
  CantidadLibro: number
  Disponibilidad: boolean
}

export interface GetLibrosAltaRotacionDto {
    Titulo: string
    PromedioDuracion: number
    CantidadPrestamos: number
    UsusariosDistintos: number
}

export interface PostLibroDto {
    Titulo: string
    Categoria: string
    CantidadLibro: number
    Disponible: boolean
}

export interface PutLibroDto {
    Titulo: string
    Categoria: string
    CantidadLibro: number
    Disponible: boolean
}

export interface Prestamo {
    Id: string
    UsuarioId: string
    Usuario?: Usuario
    LibroId: string
    Libro?: Libro
    FechaInicio: string
    FechaFin: string
    FechaDevolucion?: string | null
    CostoDiario: number
    CostoEstimado: number 
}

export interface PostPrestamoDto {
    UsuarioId: string
    LibroId: string
    FechaInicio: string
    FechaFin: string
    FechaDevolucion?: string | null
    CostoDiario: number
}

export interface ApiResponse<T> {
    success: boolean
    message: string
    errorCode?: string
    data?: T
}
