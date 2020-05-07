import {NetworkComparisonHandler, ErrorConditionHandler, AsnHandler} from "./src/handlers/handlers"
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import {Network} from "./src/models/net"
import {cloudflare} from './src/utils/constants'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const response = await getAssetFromKV(event)
  const url = new URL(event.request.url)
  const asn = url.searchParams.get('asn')
  if (asn) {
    try {
      const cfNetwork = await new Network(cloudflare['asn']).populate()
      const otherNetwork = await new Network(asn).populate()
      const sharedItems = await cfNetwork.compare(otherNetwork)
      return await new HTMLRewriter()
        .on('#asnField', new AsnHandler(asn))
        .on('#formContainer', new NetworkComparisonHandler({cfNetwork, otherNetwork, sharedItems}))
        .transform(response)
    } catch (e) {
      console.log('::handleEvent::catch')
      console.log(e)
      return await new HTMLRewriter()
        .on('#asnField', new AsnHandler(asn))
        .on('#formContainer', new ErrorConditionHandler(asn))
        .transform(response)
    }
  }
  return response
}

