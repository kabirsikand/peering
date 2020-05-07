import {NetworkExchange} from './netixlan'
import {NetworkFacility} from './netfac'
import {findAsn, fetchAdditionalDetails} from "../utils/pdbinterface"

export class Network {
	constructor(asn) {
		this.asn = asn
	}

	async populate(){
		const net = await findAsn(this.asn)
		this.id = net['id']
		this.name = net['name']
		this.website = net['website']
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
		return this
	}

	compareItems(listA, listB, sharedItems) {
		for (let key in listA) {
			if(listB[key]) {
				sharedItems[key] = listA[key]
			}
		}
		return sharedItems
	}

	async compare(network) {
		const sharedFacilities = this.compareItems(this.facilities, network.facilities, {})
		const sharedExchanges = this.compareItems(this.exchanges, network.exchanges, {})
		return await fetchAdditionalDetails(sharedFacilities, sharedExchanges)
	}
}