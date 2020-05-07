class NetworkComparisonHandler {
	constructor({cfNetwork, otherNetwork, sharedItems}) {
		console.log("::NetworkComparisonHandler::constructor")
		this.sharedItems = sharedItems
		this.otherNetwork = otherNetwork
		this.cfNetwork = cfNetwork
	}

	element(element) {
		if (this.sharedItems.length > 0) {
			element.append(`
				<h4>Shared Facilities and Exchanges between ${this.cfNetwork.name} and ${this.otherNetwork.name}</h4>
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
			element.append(`<h4>No shared Exchanges or Facilities between ${this.cfNetwork.name} and ${this.otherNetwork.name}</h4>`, { html: true })
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
		element.setAttribute("value", this.asn)
	}
}


export {NetworkComparisonHandler, ErrorConditionHandler, AsnHandler}

