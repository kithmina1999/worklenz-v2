// these functions are utility functions which are use for save data and get data from local storage
export const getFromLocalStorage = (name: string) => {
    const storedItem = localStorage.getItem(name)
    return storedItem ? JSON.parse(storedItem) : null
}

export const saveToLocalStorage = (name: string, item: unknown) => {
    localStorage.setItem(name, JSON.stringify(item))
}
