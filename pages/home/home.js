import {getMultiData, getGoodsData} from '../../service/home.js'
const type = ['pop','new','sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
		banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:"pop"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// 请求轮播图和推荐数据
		this._getMultiData();
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
    console.log(this.data.goods.pop.list);
    
  },
  // -------------事件监听函数-----------------
  tanClick(event){
    const index = event.detail.index
    this.setData({
      currentType:type[index]
    })
  },
  // ------------网络请求函数-------------
  _getMultiData(){
    getMultiData().then(res=>{
			// 取出轮播图和推荐数据
			const banners = res.data.data.banner.list
			const recommends = res.data.data.recommend.list
			// 将数据放到data中
			this.setData({
				banners,
				recommends
			})
    })
  },
  _getGoodsData(type){
    // 获取页码
    const page = this.data.goods[type].page + 1
    getGoodsData(type,page).then(res=>{
      const list = res.data.data.list
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey] : oldList,
        [pageKey] : page
      })
    })
  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType)    
  }
})