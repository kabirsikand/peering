import {findAsn, fetchAdditionalDetails} from "./findAsn"
import {Network} from "../models/net"
import {cloudflare} from "../utils/constants"


class NetworkComparisonHandler {
	constructor({networks, sharedItems}) {
		console.log("::NetworkComparisonHandler::constructor")
		this.sharedItems = sharedItems
		this.otherNetwork = networks.otherNetwork
		this.cloudflareNetwork = networks.cloudflareNetwork
	}

	element(element) {
		if (this.sharedItems.length > 0) {
			element.append(`
				<h4>Shared Facilities and Exchanges between ${this.cloudflareNetwork.name} and ${this.otherNetwork.name}</h4>
        <table>
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Networks</th>
                  <th>Type</th>
                </tr>
            </thead>
            <tbody>
            	${this.sharedItems.map((item) => { return item.toHTML() }).join("")}
            </tbody>
        </table>
      `, { html: true })
		} else {
			element.append(`<h4>No shared Exchanges or Facilities between ${this.cloudflareNetwork.name} and ${this.otherNetwork.name}</h4>`, { html: true })
		}
	}
}

class ErrorConditionHandler {
	constructor(asn) {
		this.asn = asn
	}
	element(element) {
		element.append(`<h4>ASN ${this.asn} Not Found on PeeringDB</h4>`, {html: true})
	}
}

class AsnHandler {
	constructor(asn) {
		this.asn = asn
	}
	element(element) {
		console.log(element.attributes)
		element.setAttribute("value", this.asn)
	}
}


async function gatherNetworkDetails(asn) {
	const cloudflareNetworkInfo = await findAsn(cloudflare['asn'])
	const cloudflareNetwork = await new Network(cloudflareNetworkInfo)

	const otherNetworkInfo = await findAsn(asn)
	const otherNetwork = await new Network(otherNetworkInfo)

	return {cloudflareNetwork, otherNetwork}
}



function compareItems(listA, listB, sharedItems) {
	for (let key in listA) {
		if(listB[key]) {
			sharedItems[key] = listA[key]
		}
	}
	return sharedItems
}


async function compare({cloudflareNetwork, otherNetwork}) {
	console.log("::compare")
	const facilities = compareItems(cloudflareNetwork['facilities'], otherNetwork['facilities'], {})
	const exchanges = compareItems(cloudflareNetwork['exchanges'], otherNetwork['exchanges'], {})

	return await fetchAdditionalDetails(facilities, exchanges)
}

export {gatherNetworkDetails, compare, NetworkComparisonHandler, ErrorConditionHandler, AsnHandler}