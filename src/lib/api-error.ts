import type { ApiErrorResponse } from '@/types/api-error'

export class ApiError extends Error {
  status: number
  errors: ApiErrorResponse['errors']

  constructor(
    status: number,
    response: ApiErrorResponse,
  ) {
    super(response.message)

    this.name = 'ApiError'
    this.status = status
    this.errors = response.errors ?? []
  }
}
