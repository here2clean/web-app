export async function GetQuery(route,token) {
    let header = new Headers();
    header.append("Authorization","Bearer "+token);
    return fetch('http://heretoclean.cambar.re:80/api'+route, {
        method: 'GET',
        headers: header
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch((error) => { return false });
}

export async function DeleteQuery(route,token) {
    let header = new Headers();
    header.append("Authorization","Bearer "+token);
    return fetch('http://heretoclean.cambar.re:80/api'+route, {
        method: 'DELETE',
        headers: header
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch((error) => { return false });
}

export async function PostQuery(route, body, token) {
    let header = new Headers();
    header.append("Content-type","application/json");
    header.append("Authorization","Bearer "+token);
    return fetch('http://heretoclean.cambar.re:80/api'+route, {
        method: 'POST',
        body: body,
        headers: header
    }).then(function(response) {
        return true;
    }).catch(function(callback) { return false });
}