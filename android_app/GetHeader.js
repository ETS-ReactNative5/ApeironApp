import SyncStorage from 'sync-storage';

function getAuthHeader() {
	if (SyncStorage.get("expireTime") <= new Date().getTime()) {
		SyncStorage.remove("keyToken");
		SyncStorage.remove("keyRole");
		SyncStorage.remove("expireTime");
	}

	return `Bearer ${SyncStorage.get("keyToken")}`;
}

export default getAuthHeader;
