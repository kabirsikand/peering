const Router = require('./router')
import {gatherNetworkDetails, compare, NetworkComparisonHandler, ErrorConditionHandler, AsnHandler} from "./src/routes/compare"
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  let response = await getAssetFromKV(event)
  const url = new URL(event.request.url)
  const asn = url.searchParams.get('asn')
  try {
    if (asn) {
      const networks = await gatherNetworkDetails(asn)
      const sharedItems = await compare(networks)
      return await new HTMLRewriter()
        .on('#asnField', new AsnHandler(asn))
        .on('#formContainer', new NetworkComparisonHandler({networks, sharedItems}))
        .transform(response)
    }
    return response
  } catch (e) {
    console.log('::handleEvent::catch')
    console.log(e)
    if (asn) {
      return await new HTMLRewriter()
        .on('#asnField', new AsnHandler(asn))
        .on('#formContainer', new ErrorConditionHandler(asn))
        .transform(response)
    } else {
      return response
    }
  }
}

