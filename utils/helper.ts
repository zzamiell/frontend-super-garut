export function isQueryInvalid(query: Record<string, any>): boolean {
  return Object.values(query).some((value) => !value)
}

export const formHelper = {
  isQueryInvalid
}