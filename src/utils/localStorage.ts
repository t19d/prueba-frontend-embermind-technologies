// TODO
import { setGuestSession, clearGuestSession } from "@/features/movies/sessionSlice";
import { createGuestSession } from "@/features/movies/tmdbApi";
import { GuestSession } from "@/models/session.model";
import { AppDispatch } from "@/redux/store";

const GUEST_SUCCESS_KEY = "guest_session_success";
const GUEST_SESSION_ID_KEY = "guest_session_id";
const GUEST_SESSION_EXPIRY_KEY = "guest_session_expiry";

export async function loadLocalStorageGuestSession(dispatch: AppDispatch) {
	const guestSession = getLocalStorageGuestSession();
	let isExpired = true;
	if (guestSession.expires_at) isExpired = new Date(guestSession.expires_at) < new Date();

	// Comprobar si está caducado o guardado
	if (!isExpired && guestSession.guest_session_id && guestSession.expires_at && guestSession.success) {
		dispatch(setGuestSession(guestSession));
	} else {
		// Intentar generar una nueva y, si falla, eliminar todos los datos del storage
		try {
			const newGuestSession = await createGuestSession();
			saveLocalStorageGuestSession(newGuestSession);
			dispatch(setGuestSession(newGuestSession));
		} catch (error) {
			clearLocalStorageGuestSession();
			dispatch(clearGuestSession());
			throw error;
		}
	}
}

// #region Utils
function saveLocalStorageGuestSession({ success, guest_session_id, expires_at }: GuestSession): void {
	localStorage.setItem(GUEST_SUCCESS_KEY, success ? "1" : "0");
	localStorage.setItem(GUEST_SESSION_ID_KEY, guest_session_id);
	localStorage.setItem(GUEST_SESSION_EXPIRY_KEY, expires_at);
}

function clearLocalStorageGuestSession(): void {
	localStorage.removeItem(GUEST_SUCCESS_KEY);
	localStorage.removeItem(GUEST_SESSION_ID_KEY);
	localStorage.removeItem(GUEST_SESSION_EXPIRY_KEY);
}

function getLocalStorageGuestSession(): GuestSession {
	return {
		success: localStorage.getItem(GUEST_SUCCESS_KEY) === "1" ? true : false,
		guest_session_id: localStorage.getItem(GUEST_SESSION_ID_KEY) ?? "",
		expires_at: localStorage.getItem(GUEST_SESSION_EXPIRY_KEY) ?? "",
	};
}
// #endregion
