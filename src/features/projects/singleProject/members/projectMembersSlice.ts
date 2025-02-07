import { projectMembersApiService } from '@/api/project-members/project-members.api.service';
import { projectsApiService } from '@/api/projects/projects.api.service';
import { IMentionMemberViewModel } from '@/types/project/projectComments.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectMembersState {
  membersList: IMentionMemberViewModel[];
  allMembersList: IMentionMemberViewModel[];
  isDrawerOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectMembersState = {
  membersList: [],
  allMembersList: [],
  isDrawerOpen: false,
  isLoading: false,
  error: null,
};

const getProjectMembers = createAsyncThunk(
  'projectMembers/getProjectMembers',
  async (params: {
    projectId: string;
    index: number;
    size: number;
    field: string;
    order: string;
    search: string | null;
  }) => {
    const { projectId, index, size, field, order, search } = params;
    const response = await projectsApiService.getMembers(
      projectId,
      index,
      size,
      field,
      order,
      search
    );
    if (!response.done) {
      throw new Error('Failed to fetch project members');
    }
    return response.body;
  }
);

const getAllProjectMembers = createAsyncThunk(
  'projectMembers/getAllProjectMembers',
  async (projectId: string) => {
    const response = await projectMembersApiService.getByProjectId(projectId);
    return response.body;
  }
);

const projectMembersSlice = createSlice({
  name: 'projectMembers',

  initialState,
  reducers: {
    toggleProjectMemberDrawer: state => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    addProjectMember: (state, action: PayloadAction<IMentionMemberViewModel>) => {
      state.membersList.push(action.payload);
    },
    setProjectMembers: (state, action: PayloadAction<IMentionMemberViewModel[]>) => {
      state.membersList = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProjectMembers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProjectMembers.fulfilled, (state, action) => {
        state.membersList = action.payload as IMentionMemberViewModel[];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProjectMembers.rejected, (state, action) => {
        state.membersList = [];
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch members';
      })
      .addCase(getAllProjectMembers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProjectMembers.fulfilled, (state, action) => {
        state.allMembersList = action.payload as IMentionMemberViewModel[];
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getAllProjectMembers.rejected, (state, action) => {
        state.allMembersList = [];
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch members';
      });

  },
});

export const { toggleProjectMemberDrawer, addProjectMember, setProjectMembers } =
  projectMembersSlice.actions;
export { getProjectMembers, getAllProjectMembers };
export default projectMembersSlice.reducer;
