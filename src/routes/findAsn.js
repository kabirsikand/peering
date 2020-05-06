import {peeringDb} from '../utils/constants'

async function fetchPdbData(path) {
	const response = await fetch(new Request(peeringDb['baseUrl'] + path))
	const body = await response.json()
	return body['data']
}

async function fetchAdditionalDetails(facilities, exchanges) {
	const sharedItems = []
	if (Object.keys(facilities).length > 0) {
		const facilityDetails = await fetchPdbData(peeringDb['facEndpoint'] + "?id__in=" + Object.keys( facilities ).join(","))
		for (const facility of facilityDetails) {
			facilities[facility.id].populate(facility)
			sharedItems.push(facilities[facility.id])
		}
	}
	if (Object.keys(exchanges).length > 0) {
		const exchangeDetails = await fetchPdbData(peeringDb['ixEndpoint'] + "?id__in=" + Object.keys( exchanges ).join(","))
		for (const exchange of exchangeDetails) {
			exchanges[exchange.id].populate(exchange)
			sharedItems.push(exchanges[exchange.id])
		}
	}
	return sharedItems
}

async function findAsn(asn) {
	console.log("::findAsn")
	const data = await fetchPdbData(peeringDb['netEndpoint'] + "?" + `asn__in=${asn}&depth=2`)
	return data[0]
}

export {findAsn, fetchAdditionalDetails}