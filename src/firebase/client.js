import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBcY-QN_D1JtK0eneudzcGHsVzSm4RqFzs",
	authDomain: "pavosprim-admin.firebaseapp.com",
	projectId: "pavosprim-admin",
	storageBucket: "pavosprim-admin.appspot.com",
	messagingSenderId: "646674119737",
	appId: "1:646674119737:web:65bdbcf27177560c4021e8",
};
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
	const { uid, username, email, avatar, createdAt, updatedAt, approvalStatus } =
		user;
	return {
		uid,
		avatar,
		username,
		email,
		createdAt: createdAt.toDate(),
		updatedAt: updatedAt.toDate(),
		approvalStatus,
	};
};

export const uploadImage = (file) => {
	const storageRef = firebase.storage().ref();
	const fileRef = storageRef.child(file.name);
	const task = fileRef.put(file);
	return task;
};

export const onAuthStateChanged = (onChange) => {
	return firebase.auth().onAuthStateChanged((user) => {
		const uid = user?.uid;
		if (uid) {
			db.collection("users")
				.where("uid", "==", uid)
				.onSnapshot((snapshot) => {
					if (snapshot.empty) {
						setTimeout(() => {
							db.collection("users")
								.where("uid", "==", uid)
								.get()
								.then((snapshot) => {
									const newUser = snapshot.docs[0].data();
									const normalizeUser = user
										? mapUserFromFirebaseAuthToUser(newUser)
										: null;
									onChange(normalizeUser);
								});
						}, 1500);
					} else {
						const newUser = snapshot.docs[0].data();
						const normalizeUser = user
							? mapUserFromFirebaseAuthToUser(newUser)
							: null;
						onChange(normalizeUser);
					}
				});
		} else {
			onChange(null);
		}
	});
};

export const loginWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(googleProvider)
		.then((user) => {
			const userToDb = user.user;
			const normalizeUsername = userToDb.displayName
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase();
			const username = normalizeUsername.split(" ").join("");
			return db
				.collection("users")
				.where("uid", "==", userToDb.uid)
				.get()
				.then((snapshot) => {
					if (snapshot.empty) {
						db.collection("users")
							.where("username", "==", username)
							.get()
							.then((snapshotUsername) => {
								if (snapshotUsername.empty) {
									db.collection("users").add({
										uid: userToDb.uid,
										username: username,
										email: userToDb.email,
										avatar: userToDb.photoURL.replaceAll("s96-c", "s1080-c"),
										createdAt: firebase.firestore.Timestamp.fromDate(
											new Date()
										),
										updatedAt: firebase.firestore.Timestamp.fromDate(
											new Date()
										),
										approvalStatus: "pending",
									});
								} else {
									const usernameRandom =
										username + Math.floor(Math.random() * 100);
									db.collection("users").add({
										uid: userToDb.uid,
										username: usernameRandom,
										email: userToDb.email,
										avatar: userToDb.photoURL.replaceAll("s96-c", "s1080-c"),
										createdAt: firebase.firestore.Timestamp.fromDate(
											new Date()
										),
										updatedAt: firebase.firestore.Timestamp.fromDate(
											new Date()
										),
										approvalStatus: "pending",
									});
								}
							});
					}
				});
		});
};

export const logout = () => {
	return firebase.auth().signOut();
};

export const getAllProducts = (cb) => {
	return db.collection("products").onSnapshot((snapshot) => {
		const products = snapshot.docs.map((doc) => {
			const product = doc.data();
			product.id = doc.id;
			return product;
		});
		cb(products);
	});
};

export const getAllSellProducts = (cb) => {
	return db.collection("sellProducts").onSnapshot((snapshot) => {
		const products = snapshot.docs.map((doc) => {
			const product = doc.data();
			product.id = doc.id;
			return product;
		});
		cb(products);
	});
};

export const getAllStoreTypes = (cb) => {
	return db.collection("storeTypes").onSnapshot((snapshot) => {
		const storeTypes = snapshot.docs.map((doc) => {
			const storeType = doc.data();
			storeType.id = doc.id;
			return storeType;
		});
		cb(storeTypes);
	});
};

export const createProduct = (product) => {
	return db.collection("products").add(product);
};

export const createSellProduct = (product) => {
	return db.collection("sellProducts").add(product);
};

export const deleteSellProduct = (id) => {
	return db.collection("sellProducts").doc(id).delete();
};

export const findStoreSellsByDate = (date, cb) => {
	return db
		.collection("storeSells")
		.where("date", "==", date)
		.onSnapshot((snapshot) => {
			const storeSells = snapshot.docs.map((doc) => {
				const storeSell = doc.data();
				storeSell.id = doc.id;
				return storeSell;
			});
			cb(storeSells);
		});
};

export const findStoreSellsStarted = (cb) => {
	return db
		.collection("storeSells")
		.where("status", "==", "started")
		.onSnapshot((snapshot) => {
			const storeSells = snapshot.docs.map((doc) => {
				const storeSell = doc.data();
				storeSell.id = doc.id;
				return storeSell;
			});
			cb(storeSells);
		});
};

export const startStoreSells = (storeSells, uid) => {
	return db
		.collection("storeSells")
		.add(storeSells)
		.then(() => {
			return db.collection("sellerSells").add({
				date: new Date().toLocaleDateString(),
				sellerUID: uid,
				sells: [],
				earningsToReceive: 0,
				earningsReceived: 0,
				status: "started",
				earningDistribution: [],
			});
		});
};

export const joinStoreSells = async (id, uid) => {
	return await db
		.collection("storeSells")
		.doc(id)
		.update({
			sellersUIDS: firebase.firestore.FieldValue.arrayUnion(uid),
		})
		.then(() => {
			return db.collection("sellerSells").add({
				date: new Date().toLocaleDateString(),
				sellerUID: uid,
				sells: [],
				earningsToReceive: 0,
				earningsReceived: 0,
				status: "started",
				earningDistribution: [],
			});
		});
};

export const findNamesByUIDS = (uids, cb) => {
	return db
		.collection("users")
		.where("uid", "in", uids)
		.onSnapshot((snapshot) => {
			const users = snapshot.docs.map((doc) => {
				const user = doc.data();
				user.id = doc.id;
				return user;
			});
			cb(users);
		});
};

export const getSellerSellsByDate = (date, uid, cb) => {
	return db
		.collection("sellerSells")
		.where("date", "==", date)
		.where("sellerUID", "==", uid)
		.onSnapshot((snapshot) => {
			const sellerSells = snapshot.docs.map((doc) => {
				const sellerSell = doc.data();
				sellerSell.id = doc.id;
				return sellerSell;
			});
			cb(sellerSells);
		});
};

export const getProductsByStoreType = (storeType, cb) => {
	return db
		.collection("sellProducts")
		.where("storeType", "==", storeType)
		.onSnapshot((snapshot) => {
			const products = snapshot.docs.map((doc) => {
				const product = doc.data();
				product.id = doc.id;
				return product;
			});
			cb(products.sort((a, b) => a.price - b.price));
		});
};

export const createDiscountCodeByInstagram = async (instagram) => {
	// generate discount code of 12 characters
	let discountCodeGenerated = Math.random().toString(36).substr(2, 12);
	// check if discount code exists
	const IgCodeExists = await db
		.collection("discountCodes")
		.where("instagram", "==", instagram)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				return {
					exists: false,
				};
			} else {
				return {
					exists: true,
					code: snapshot.docs[0].data().discountCode,
					used: snapshot.docs[0].data().used,
					instagram: snapshot.docs[0].data().instagram,
				};
			}
		});

	// check if discount code exists
	const discountCodeExists = await db
		.collection("discountCodes")
		.where("discountCode", "==", discountCodeGenerated)
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				return false;
			} else {
				return true;
			}
		});

	if (IgCodeExists.exists) {
		return {
			error: true,
			errorCode: "alreadyExists",
			discountCode: IgCodeExists.code,
			instagram: IgCodeExists.instagram,
			used: IgCodeExists.used,
		};
	}

	if (discountCodeExists) {
		discountCodeGenerated = Math.random().toString(36).substr(2, 12);
	}

	await db.collection("discountCodes").add({
		discountCode: discountCodeGenerated,
		instagram,
		used: false,
	});

	return {
		discountCode: discountCodeGenerated,
		instagram,
		used: false,
	};
};

export const claimCode = async (code, instagram) => {
	const discountCode = await db
		.collection("discountCodes")
		.where("discountCode", "==", code.toLowerCase())
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				return {
					exists: false,
				};
			} else {
				return {
					exists: true,
					code: snapshot.docs[0].data().discountCode,
					used: snapshot.docs[0].data().used,
					instagram: snapshot.docs[0].data().instagram,
				};
			}
		});

	if (!discountCode.exists) {
		return {
			error: true,
			errorCode: "codeDoesNotExist",
		};
	}

	if (discountCode.instagram !== instagram.toLowerCase()) {
		return {
			error: true,
			errorCode: "instagramDoesNotMatch",
		};
	}

	if (discountCode.used) {
		return {
			error: true,
			errorCode: "codeUsed",
		};
	}

	await db
		.collection("discountCodes")
		.where("discountCode", "==", code.toLowerCase())
		.get()
		.then((snapshot) => {
			snapshot.docs[0].ref.update({
				used: true,
			});
		});

	return {
		error: false,
	};
};
