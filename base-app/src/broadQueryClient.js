import {BroadcastChannel} from 'broadcast-channel'



export function broadcastQueryClient({
                                         queryClient,
                                         broadcastChannel = 'react-query',
                                         master = false,
                                         masterChannelName,
                                         masterReplyChannelName
                                     }) {
    let transaction = false
    const tx = (cb => {
        transaction = true
        cb()
        transaction = false
    });
    const channel = new BroadcastChannel(broadcastChannel, {
        webWorkerSupport: true,
    })
    const queryCache = queryClient.getQueryCache();

    if (master) {

        const masterChannel = new BroadcastChannel(masterChannelName, {
            webWorkerSupport: true
        });
      const masterReplyChannel = new BroadcastChannel(masterReplyChannelName, {
        webWorkerSupport: true
      });

        masterChannel.onmessage = message => {
            const data  = queryClient.getQueryData(message.key)
            masterReplyChannel.postMessage({messageId: message.messageId,
              data,
              resolved: Boolean(data)
            })
        }
    }
    queryClient.getQueryCache().subscribe(queryEvent => {
        if (transaction || !queryEvent?.query) {
            return
        }
        const {
            query: {queryHash, queryKey, state},
        } = queryEvent

        if (queryEvent.type === 'queryAdded') {

        }
        if (
            queryEvent.type === 'queryUpdated' &&
            queryEvent.action?.type === 'success'
        ) {
            channel.postMessage({
                type: 'queryUpdated',
                queryHash,
                queryKey,
                state,
            })
        }

        if (queryEvent.type === 'queryRemoved') {
            channel.postMessage({
                type: 'queryRemoved',
                queryHash,
                queryKey,
            })
        }
    })

    channel.onmessage = action => {
        if (!action?.type) {
            return
        }

        tx(() => {
            const {type, queryHash, queryKey, state} = action;
            console.log(action, 'onmessage');

            if (type === 'queryUpdated') {
                const query = queryCache.get(queryHash)

                if (query) {
                    query.setState(state)
                    return
                }

                queryCache.build(
                    queryClient,
                    {
                        queryKey,
                        queryHash,
                    },
                    state
                )
            } else if (type === 'queryRemoved') {
                const query = queryCache.get(queryHash)

                if (query) {
                    queryCache.remove(query)
                }
            }
        })
    }
}