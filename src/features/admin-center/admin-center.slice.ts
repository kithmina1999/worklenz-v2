import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import { IBillingAccountInfo, IFreePlanSettings } from '@/types/admin-center/admin-center.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface adminCenterState {
  isRedeemCodeDrawerOpen: boolean;
  isUpgradeModalOpen: boolean;
  loadingBillingInfo: boolean;
  billingInfo: IBillingAccountInfo | null;
  freePlanSettings: IFreePlanSettings | null;
}

const initialState: adminCenterState = {
  isRedeemCodeDrawerOpen: false,
  isUpgradeModalOpen: false,
  loadingBillingInfo: false,
  billingInfo: null,
  freePlanSettings: null,
};

export const fetchBillingInfo = createAsyncThunk('adminCenter/fetchBillingInfo', async () => {
  const res = await adminCenterApiService.getBillingAccountInfo();
  return res.body;
});

export const fetchFreePlanSettings = createAsyncThunk('adminCenter/fetchFreePlanSettings', async () => {
  const res = await adminCenterApiService.getFreePlanSettings();
  return res.body;
});

const adminCenterSlice = createSlice({
  name: 'adminCenterReducer',
  initialState,
  reducers: {
    toggleRedeemCodeDrawer: state => {
      state.isRedeemCodeDrawerOpen ? (state.isRedeemCodeDrawerOpen = false) : (state.isRedeemCodeDrawerOpen = true);
    },
    toggleUpgradeModal: state => {
      state.isUpgradeModalOpen ? (state.isUpgradeModalOpen = false) : (state.isUpgradeModalOpen = true);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBillingInfo.pending, (state, action) => {
      state.loadingBillingInfo = true;
    });
    builder.addCase(fetchBillingInfo.fulfilled, (state, action) => {
      state.billingInfo = action.payload;
      state.loadingBillingInfo = false;
    });
    builder.addCase(fetchBillingInfo.rejected, (state, action) => {
      state.loadingBillingInfo = false;
    });
  },
});

export const { toggleRedeemCodeDrawer, toggleUpgradeModal } = adminCenterSlice.actions;
export default adminCenterSlice.reducer;
