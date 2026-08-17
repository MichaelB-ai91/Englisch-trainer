/* db.js — IndexedDB-Wrapper für die English-Trainer-App.
   Object Stores: cards, categories, settings, dailyRounds, ieltsAttempts. */

const DB_NAME = "englischTrainerDB";
const DB_VERSION = 2;

const DB = (() => {
  let dbPromise = null;

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains("cards")) {
          const cards = db.createObjectStore("cards", { keyPath: "id" });
          cards.createIndex("category", "category", { unique: false });
        }
        if (!db.objectStoreNames.contains("categories")) {
          db.createObjectStore("categories", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("dailyRounds")) {
          db.createObjectStore("dailyRounds", { keyPath: "date" });
        }
        if (!db.objectStoreNames.contains("ieltsAttempts")) {
          db.createObjectStore("ieltsAttempts", { keyPath: "id" });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  function tx(storeName, mode) {
    return open().then((db) => db.transaction(storeName, mode).objectStore(storeName));
  }

  function promisifyRequest(req) {
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  return {
    async getAll(storeName) {
      const store = await tx(storeName, "readonly");
      return promisifyRequest(store.getAll());
    },

    async getByIndex(storeName, indexName, value) {
      const store = await tx(storeName, "readonly");
      return promisifyRequest(store.index(indexName).getAll(value));
    },

    async get(storeName, key) {
      const store = await tx(storeName, "readonly");
      return promisifyRequest(store.get(key));
    },

    async put(storeName, value) {
      const store = await tx(storeName, "readwrite");
      return promisifyRequest(store.put(value));
    },

    async putAll(storeName, values) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        values.forEach((v) => store.put(v));
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    },

    async delete(storeName, key) {
      const store = await tx(storeName, "readwrite");
      return promisifyRequest(store.delete(key));
    },

    async count(storeName) {
      const store = await tx(storeName, "readonly");
      return promisifyRequest(store.count());
    },

    async clear(storeName) {
      const store = await tx(storeName, "readwrite");
      return promisifyRequest(store.clear());
    },
  };
})();
