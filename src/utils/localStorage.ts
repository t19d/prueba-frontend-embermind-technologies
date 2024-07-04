// TODO
import { setGuestSession, clearGuestSession } from "@/features/movies/sessionSlice";
import { AppDispatch } from "@/redux/store";

const GUEST_SUCCESS_KEY = "guest_session_success";
const GUEST_SESSION_ID_KEY = "guest_session_id";
const GUEST_SESSION_EXPIRY_KEY = "guest_session_expiry";

export const saveGuestSession = (success: boolean, guestSessionId: string, expiresAt: string) => {
	localStorage.setItem(GUEST_SUCCESS_KEY, success ? "1" : "0");
	localStorage.setItem(GUEST_SESSION_ID_KEY, guestSessionId);
	localStorage.setItem(GUEST_SESSION_EXPIRY_KEY, expiresAt);
};

export const loadGuestSession = (dispatch: AppDispatch) => {
	const success = localStorage.getItem(GUEST_SUCCESS_KEY) === "1" ? true : false;
	const guestSessionId = localStorage.getItem(GUEST_SESSION_ID_KEY);
	const expiresAt = localStorage.getItem(GUEST_SESSION_EXPIRY_KEY);

	if (guestSessionId && expiresAt && success) {
		const isExpired = new Date(expiresAt) < new Date();
		if (isExpired) {
			localStorage.removeItem(GUEST_SUCCESS_KEY);
			localStorage.removeItem(GUEST_SESSION_ID_KEY);
			localStorage.removeItem(GUEST_SESSION_EXPIRY_KEY);
			dispatch(clearGuestSession());
		} else {
			dispatch(setGuestSession({ success, guestSessionId, expiresAt }));
		}
	} else {
		dispatch(clearGuestSession());
	}
};
