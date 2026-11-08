/** Reads a text field from FormData; returns '' for missing or file values. */
export const getField = (form: FormData, key: string) => {
  const value = form.get(key)
  return typeof value === 'string' ? value : ''
}
