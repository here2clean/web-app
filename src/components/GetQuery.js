
export async function GetQuery(route) {
    return fetch('http://localhost:8085/api'+route, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch((error) => function(callback) { return 'error' });
}

let header = new Headers();
header.append("Content-type","application/json");
export async function PostQuery(route, body) {
    return fetch('http://localhost:8085/api'+route, {
        method: 'POST',
        body: body,
        headers: header
    }).then(function(response) {
        return true;
    }).catch(function(callback) { return false });
}