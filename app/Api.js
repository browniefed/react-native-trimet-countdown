var API = {
    search(query) {
        return fetch('http://localhost:5000/search?stopId=' + query).then((response) => response.json());
    }
}

module.exports = API;