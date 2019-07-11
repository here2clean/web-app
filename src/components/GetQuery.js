export async function GetQuery(route,token) {
    let header = new Headers();
    header.append("Authorization","Bearer "+token);
    return fetch('http://localhost:8085/api'+route, {
        method: 'GET',
        headers: header
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch((error) => { return false });
}

export async function PostQuery(route, body) {
    let header = new Headers();
    header.append("Content-type","application/json");
    return fetch('http://localhost:8085/api'+route, {
        method: 'POST',
        body: body,
        headers: header
    }).then(function(response) {
        return true;
    }).catch(function(callback) { return false });
}