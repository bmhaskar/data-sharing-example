import React, {useEffect} from 'react';
import {broadcastQueryClient} from "./broadQueryClient";
import {queryClient, masterChannelName, masterReplyChannelName} from "./Provider";
import {useLocation} from "react-router-dom";
import {useRepos} from "./ReposProvider";


// A custom hook that builds on useLocation to parse
// the query string for you.
function useLocationQuery() {
    return new URLSearchParams(useLocation().search);
}

export  function Example() {
    const query = useLocationQuery();
    const callback = React.useCallback(()=> {
        broadcastQueryClient({
            queryClient,
            broadcastChannel: 'my-app',
            master: query?.get('master'),
            masterChannelName,
            masterReplyChannelName
        });
    }, [query]);
    useEffect(() => {
        callback();
    }, [callback])

    const { isLoading, error, data } = useRepos();

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
        </div>
    )
}

