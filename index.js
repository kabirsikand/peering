import { NetworkComparisonHandler, ErrorConditionHandler, AsnHandler } from "./src/handlers/handlers"
import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler'
import { Network } from "./src/models/net"
import { cloudflare } from './src/utils/constants'

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const response = await getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp })
  const url = new URL(event.request.url)
  const asn = url.searchParams.get('asn')

  try {
    if (asn) {
      const cfNetwork = await new Network(cloudflare['asn']).populate()
      const otherNetwork = await new Network(asn).populate()
      const sharedItems = await cfNetwork.compare(otherNetwork)
      return await new HTMLRewriter()
        .on('#asnField', new AsnHandler(asn))
        .on('#formContainer', new NetworkComparisonHandler({cfNetwork, otherNetwork, sharedItems}))
        .transform(response)
    } else { return response }  
  } catch (e) {
    return await new HTMLRewriter()
      .on('#asnField', new AsnHandler(asn))
      .on('#formContainer', new ErrorConditionHandler(asn))
      .transform(response)
  }
}


