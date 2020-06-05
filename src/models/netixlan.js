export class NetworkExchange {
	constructor(netixlan){
		this.id = netixlan['ix_id']		
		this.name = netixlan['name']
		this.type = 'Exchange'
		this.url = `https://peeringdb.com/fac/${this.id}`
	}

	populate(details) {
		this.website = details['website']
		this.networks = details['net_count']
		this.location = details['city'] + ", " + details['country']
	}
}

