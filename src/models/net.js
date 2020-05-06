import {NetworkExchange} from './netixlan'
import {NetworkFacility} from './netfac'
import {peeringDb} from '../utils/constants'

export class Network {
	constructor(net){
		console.log("::Network::constructor")
		this.id = net['id']
		this.name = net['name']
		this.website = net['website']
		this.asn = net['asn']
		this.notes = net['notes']

		this.exchanges = {}
		for (let i in net['netixlan_set']) {
			const netEx = new NetworkExchange(net['netixlan_set'][i])
			this.exchanges[netEx.id] = netEx
		}

		this.facilities = {}
		for (let i in net['netfac_set']) {
			const netFac = new NetworkFacility(net['netfac_set'][i])
			this.facilities[netFac.id] = netFac
		}
	}
}