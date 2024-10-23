import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../../../types/categories.types'

type CategoriesState = {
    categoriesList: CategoryType[]
}

const initialState: CategoriesState = {
    categoriesList: [],
}

const categoriesSlice = createSlice({
    name: 'categoriesReducer',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<CategoryType>) => {
            state.categoriesList.push(action.payload)
        },
    },
})

export const { addCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
