import request from './network'

export function getDetail(iid){
	return request({
		url:"/detail",
		data:{iid}
	})
}
export function getRecommends(){
	return request({
		url:"/recommend"
	})
}
export class getBaseInfo{
	constructor(itemInfo,columns,services){
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}
export class ShopInfo{
	constructor(shopInfo){
		this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
	}
}
export class ParamInfo{
	constructor(info,rule){
		this.image = info.image ? info.image[0]:''
		this.infos = info.set
		this.sizes = rule.tables
	}
}