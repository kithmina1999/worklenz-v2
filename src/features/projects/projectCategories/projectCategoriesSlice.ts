import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import logger from '@/utils/errorLogger';
import { projectCategoriesApiService } from '@/api/projects/projectCategories.api.service';
import { IProjectCategoryViewModel } from '@/types/project/projectCategory.types';

type ProjectCategoryState = {
  initialized: boolean;
  categories: IProjectCategoryViewModel[];
  loading: boolean;
};

// Async thunks
export const fetchProjectCategories = createAsyncThunk(
  'projectCategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectCategoriesApiService.getCategories();
      return response.body;
    } catch (error) {
      logger.error('Fetch Project Categories', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch project categories');
    }
  }
);

export const createProjectCategory = createAsyncThunk(
  'projectCategories/create',
  async (category: Partial<IProjectCategoryViewModel>, { rejectWithValue }) => {
    try {
      const response = await projectCategoriesApiService.createCategory(category);
      return response.body;
    } catch (error) {
      logger.error('Create Project Category', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create project category');
    }
  }
);

export const updateProjectCategory = createAsyncThunk(
  'projectCategories/update',
  async (category: IProjectCategoryViewModel, { rejectWithValue }) => {
    try {
      const response = await projectCategoriesApiService.updateCategory(category);
      return response.body;
    } catch (error) {
      logger.error('Update Project Category', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update project category');
    }
  }
);

export const deleteProjectCategory = createAsyncThunk(
  'projectCategories/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await projectCategoriesApiService.deleteCategory(id);
      return id;
    } catch (error) {
      logger.error('Delete Project Category', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete project category');
    }
  }
);

const initialState: ProjectCategoryState = {
  categories: [],
  initialized: false,
  loading: false,
};

const projectCategoriesSlice = createSlice({
  name: 'projectCategories',
  initialState,
  reducers: {
    searchCategories: (state, action: PayloadAction<string>) => {
      // If needed, implement local search filtering here
      // This is useful if you want to filter already loaded categories client-side
    },
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchProjectCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchProjectCategories.rejected, (state) => {
        state.loading = false;
      });

    // Create category
    builder
      .addCase(createProjectCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProjectCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.loading = false;
      })
      .addCase(createProjectCategory.rejected, (state) => {
        state.loading = false;
      });

    // Update category
    builder
      .addCase(updateProjectCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProjectCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProjectCategory.rejected, (state) => {
        state.loading = false;
      });

    // Delete category
    builder
      .addCase(deleteProjectCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProjectCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProjectCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { searchCategories } = projectCategoriesSlice.actions;
export default projectCategoriesSlice.reducer;
