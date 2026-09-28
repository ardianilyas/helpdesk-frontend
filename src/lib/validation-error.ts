import type { ValidationError, ApiErrorResponse } from '@/types/api-error'
import { ApiError } from './api-error'
import axios from 'axios'

export type FieldErrors<T extends string = string> = Partial<Record<T, string>>

/**
 * Extracts validation errors into a key-value object where each field key
 * maps to its FIRST error message.
 *
 * Can accept:
 * - ValidationError[]
 * - ApiError instance
 * - AxiosError with ApiErrorResponse
 * - Generic object with an `errors` array
 */
export const getFirstFieldErrors = <T extends string = string>(
  error: unknown
): FieldErrors<T> => {
  if (!error) return {}

  let errorList: ValidationError[] = []

  if (Array.isArray(error)) {
    errorList = error
  } else if (error instanceof ApiError && Array.isArray(error.errors)) {
    errorList = error.errors
  } else if (axios.isAxiosError<ApiErrorResponse>(error) && Array.isArray(error.response?.data?.errors)) {
    errorList = error.response.data.errors
  } else if (
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as { errors?: unknown }).errors)
  ) {
    errorList = (error as { errors: ValidationError[] }).errors
  }

  return errorList.reduce<FieldErrors<T>>((result, item) => {
    if (item?.field && !result[item.field as T]) {
      result[item.field as T] = item.message
    }
    return result
  }, {})
}
