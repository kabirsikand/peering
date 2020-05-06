export class NetworkFacility {
	constructor(netfac){
		this.name = netfac['name']
		this.city = netfac['city']
		this.country = netfac['country']
		this.id = netfac['fac_id']
	}

	populate(details) {
		this.networks = details['net_count']
		this.website = details['website']
	}

	toHTML() {
		return `<tr>
                  <td><a href="https://peeringdb.com/fac/${this.id}">${this.name}</a></td>
                  <td>${this.city + ", " + this.country}</td>
                  <td>${this.networks}</td>
                  <td>Facility</td>
                </tr>`
	}
}

