

//Setting cookie in browser after login for few minutes
export function setCookie(name: String, value: String, minutes: number) {
  var expires = "";
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//Getting cookie from browser for authentication
export function getCookie(name: String) {
  var nameWithEqual = name + "=";
  var cookieInfo = document.cookie.split(';');
  for (var i = 0; i < cookieInfo.length; i++) {
    var curentCookie = cookieInfo[i];
    while (curentCookie.charAt(0) == ' ') curentCookie = curentCookie.substring(1, curentCookie.length);
    if (curentCookie.indexOf(nameWithEqual) == 0) return curentCookie.substring(nameWithEqual.length, curentCookie.length);
  }
  return null;
}