import useSWR from 'swr'

export const fetcher = (...args) => fetch(...args)
    .then(res => res.json())

export const useRequest = (path, params = [], options = {}) => {
    if (!path) throw new Error('Path is required')

    let qryPath
    if (Array.isArray(params)) {
        qryPath = params.join('/')
    }
    else if (params) {
        qryPath = params
    }

    const url = qryPath ? [path, qryPath].join('/') : path
    return useSWR(url, options)
}