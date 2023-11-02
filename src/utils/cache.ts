enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(storageType: CacheType) {
    this.storage = storageType === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
