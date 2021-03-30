export interface Entry {
    id: string,
    title: string,
    description: string,
    date: string,
    pictureUrl: string,
}

export function toEntry(doc: firebase.default.firestore.DocumentSnapshot): Entry {
    const entry = {id: doc.id, ...doc.data()} as Entry;
    return entry;
}