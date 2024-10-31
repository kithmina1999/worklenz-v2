import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from '../../../types/categories.types';

type CategoriesState = {
  categoriesList: CategoryType[];
};

const initialState: CategoriesState = {
  categoriesList: [
    {
      categoryId: 'category1',
      categoryName: 'Development',
      categoryColor: '#70a6f3',
    },
    {
      categoryId: 'category2',
      categoryName: 'Management',
      categoryColor: '#ee87c5',
    },
    {
      categoryId: 'category3',
      categoryName: 'Testing',
      categoryColor: '#bf4949',
    },
  ],
};

const categoriesSlice = createSlice({
  name: 'categoriesReducer',
  initialState,
  reducers: {
    // action for add category
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      state.categoriesList.push(action.payload);
    },
    // action for delete category
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categoriesList = state.categoriesList.filter(
        (category) => category.categoryId !== action.payload
      );
    },
  },
});

export const { addCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
