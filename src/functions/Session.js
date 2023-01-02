export function SetSession(name, value) {
  sessionStorage.setItem(name, value);
}

export function IsThereASession(name){
    return sessionStorage.getItem(name) !== null
}

export function SessionValue(name){
    return sessionStorage.getItem(name);
}

export function removeSessionItem(name){
    sessionStorage.removeItem(name);
}

export function clearSession(){
    sessionStorage.clear();
}