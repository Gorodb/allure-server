import {useEffect, useMemo, useState} from "react"

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), [])

    const [ dataState, setDataState ] = useState(initialState)

    useEffect(() => {
        setDataState(initialState)
        let canceled = false
        request()
            .then(data => !canceled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !canceled && setDataState({
                data: null,
                loading: false,
                error
            }))
        return () => canceled = true
    }, [request, initialState])

    return dataState
}

export default useRequest
