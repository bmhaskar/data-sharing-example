import {QueryClient, QueryClientProvider} from "react-query";
import {useCallback} from "react";
import {BroadcastChannel} from "broadcast-channel";
export const masterChannelName = 'master-app-channel';
export const masterReplyChannelName = 'master-app-reply-channel';
export  const queryClient = new QueryClient();
export  const  Provider = ({children}) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
export const useGlobalData = (messageId, cacheKey) => {
    return useCallback(() => {
        return new Promise((resolve, reject) => {
            const masterChannel = new BroadcastChannel(masterChannelName, {webWorkerSupport: true});
            const masterReplyChannel = new BroadcastChannel(masterReplyChannelName, {webWorkerSupport: true});
            const messageId = 'repoData';
            const messageKey = 'repoData';
            setTimeout(() => reject(`Could not find data for ${JSON.stringify(messageKey)}. Timing out`),500)
            masterReplyChannel.onmessage = msg =>  {
                if(msg.messageId === messageId  && msg?.resolved) {
                    if(msg?.data) {
                        resolve(msg.data)
                    } else {
                        reject(`Could not find data for ${JSON.stringify(msg.key)}`)
                    }
                }

            };
            masterChannel.postMessage({
                messageId, // For syncronisation
                key:  messageKey // key in wueryCache
            })

        })

    }, [messageId, cacheKey])

}