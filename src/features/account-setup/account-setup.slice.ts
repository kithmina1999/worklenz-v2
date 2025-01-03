import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  value: string;
}

interface Email {
  id: number;
  value: string;
}

interface AccountSetupState {
  organizationName: string;
  projectName: string;
  templateId: string;
  tasks: Task[];
  emails: Email[];
  currentStep: number;
}

const initialState: AccountSetupState = {
  organizationName: '',
  projectName: '',
  templateId: '',
  tasks: [{ id: 0, value: '' }],
  emails: [{ id: 0, value: '' }],
  currentStep: 0,
};

const accountSetupSlice = createSlice({
  name: 'accountSetup',
  initialState,
  reducers: {
    setOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    setTemplateId: (state, action: PayloadAction<string>) => {
      state.templateId = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setEmails: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetAccountSetup: () => initialState,
  },
});

export const {
  setOrganizationName,
  setProjectName,
  setTemplateId,
  setTasks,
  setEmails,
  setCurrentStep,
  resetAccountSetup,
} = accountSetupSlice.actions;

export default accountSetupSlice.reducer; 