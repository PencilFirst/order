export function saveToLocal(id = 0, key, value) {
	// let seller = window.localStorage.__seller__;
	// let seller = uni.setStorageSync()
	let seller = uni.getStorageInfoSync('__seller__')
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		// seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	uni.setStorageSync('__seller__', seller)
};

export function loadFromLocal(id = 0, key, def) {
	// let seller = window.localStorage.__seller__;
	let seller = uni.getStorageInfoSync('__seller__')
	if (!seller) {
		return def;
	}
	seller = seller[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
};
