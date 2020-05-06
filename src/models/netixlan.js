export class NetworkExchange {
	constructor(netixlan){
		this.id = netixlan['ix_id']		
		this.name = netixlan['name']
	}

	populate(details) {
		this.city = details['city']
		this.country = details['country']
		this.website = details['website']
		this.networks = details['net_count']
	}

	toHTML() {
		return `<tr>
                  <td><a href="https://peeringdb.com/ix/${this.id}">${this.name}</a></td>
                  <td>${this.city + ", " + this.country}</td>
                  <td>${this.networks}</td>
                  <td>Exchange</td>
                </tr>`
	}
}

