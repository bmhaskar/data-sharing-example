import {BroadcastChannel} from "broadcast-channel";
import {useQuery} from "react-query";
import React from 'react';
import {loadRepos} from "./services/loadRepos";
import {useGlobalData} from "./Provider";

export const useRepos  = () => {
    const globalDataCallback = useGlobalData('repoData', 'repoData');
    return useQuery('repoData', () =>
        globalDataCallback().catch( () => loadRepos()) , {
            staleTime: 36000000,
            cacheTime: 36000000
        }
    )
}

