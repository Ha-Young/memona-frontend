export function saveCookie(key, value, expiryDay) {
  const date = new Date();

  date.setDate(date.getDate() + expiryDay);

  document.cookie =
    key + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

export function getCookie(key) {
  const value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}

export function deleteCookie(key) {
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}
