import networkTable from '../templates/networktable.hbs'

class NetworkComparisonHandler {
	constructor({cfNetwork, otherNetwork, sharedItems}) {
		console.log("::NetworkComparisonHandler::constructor")
		this.sharedItems = sharedItems
		this.otherNetwork = otherNetwork
		this.cfNetwork = cfNetwork
	}

	element(element) {
		console.log("::NetworkComparisonHandler::element")
		element.append(networkTable(this), { html: true })
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
		element.setAttribute("value", this.asn)
	}
}


export { NetworkComparisonHandler, ErrorConditionHandler, AsnHandler }

