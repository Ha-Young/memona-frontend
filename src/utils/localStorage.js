export function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function deleteStorage(key) {
  localStorage.removeItem(key);
}
