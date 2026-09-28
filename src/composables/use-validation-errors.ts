import { computed, type Ref } from 'vue'
import { getFirstFieldErrors, type FieldErrors } from '@/lib/validation-error'

/**
 * Reusable composable to bind backend validation errors to form fields.
 * Always retrieves the first error message per field.
 *
 * @param error - A reactive Ref containing the error (from TanStack Vue Query useMutation/useQuery, ApiError, or AxiosError)
 *
 * @example
 * const { mutateAsync, isPending, error, reset } = useCreateCategory();
 * const { fieldErrors, hasErrors, getFieldError } = useValidationErrors<'name' | 'description'>(error);
 */
export function useValidationErrors<T extends string = string>(
  error: Ref<unknown>
) {
  const fieldErrors = computed<FieldErrors<T>>(() => {
    return getFirstFieldErrors<T>(error.value)
  })

  const hasErrors = computed(() => Object.keys(fieldErrors.value).length > 0)

  const getFieldError = (field: T) => fieldErrors.value[field]

  return {
    fieldErrors,
    hasErrors,
    getFieldError,
  }
}
