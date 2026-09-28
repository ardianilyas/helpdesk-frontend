export interface ValidationError {
  field: string
  message: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: ValidationError[]
}
