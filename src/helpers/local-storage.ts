export function setStorageItem<T>(key: string, value: T): void {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function getStorageItem<T>(key: string): T | null {
  const data = localStorage.getItem(key)
  if (!data) return null

  return JSON.parse(data) as T
}

export function removeStorageItems(keys: string[]): void {
  return keys.forEach(key => localStorage.removeItem(key))
}
