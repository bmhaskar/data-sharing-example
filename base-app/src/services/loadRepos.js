
export const loadRepos = () => {
    return fetch('http://localhost:8089/data').then(res =>
        res.json()
    )
}