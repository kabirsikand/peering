export class NetworkFacility {
	constructor(netfac){
		this.name = netfac['name']
		this.id = netfac['fac_id']
		this.type = 'Facility'
		this.url = `https://peeringdb.com/fac/${this.id}`
		this.location = netfac['city'] + ", " + netfac['country']
	}

	populate(details) {
		this.networks = details['net_count']
		this.website = details['website']
	}
}

