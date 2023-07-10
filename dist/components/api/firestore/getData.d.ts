export declare function getFirestoreData(path: string, href: string): Promise<import("@firebase/firestore").DocumentData | null | undefined>;
export declare function getStorageData(path: string): Promise<string | null>;
export declare function getStorageDataAll(path: string): Promise<any[] | null>;
