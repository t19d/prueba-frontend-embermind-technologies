import { GuestSession } from "@/models/session.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
	success: boolean;
	guestSessionId: string | null;
	expiresAt: string | null;
}

const initialState: SessionState = {
	success: false,
	guestSessionId: null,
	expiresAt: null,
};

export const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setGuestSession: (state, action: PayloadAction<GuestSession>) => {
			state.success = action.payload.success;
			state.guestSessionId = action.payload.guest_session_id;
			state.expiresAt = action.payload.expires_at;
		},
		clearGuestSession: (state) => {
			state.success = false;
			state.guestSessionId = null;
			state.expiresAt = null;
		},
	},
});

export const { setGuestSession, clearGuestSession } = sessionSlice.actions;
export default sessionSlice.reducer;
