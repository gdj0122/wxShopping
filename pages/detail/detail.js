import {getDetail,getBaseInfo,ShopInfo,ParamInfo,getRecommends} 
from '../../service/detail'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:null,
    topImages:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommendInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDetail()
    this._getRecommends()
  },
  _getDetail(){
    getDetail(this.data.iid).then(res=>{
      const data = res.data.result;
      // 1取出顶部图片
      const topImages = data.itemInfo.topImages;
      // 2.创建BaseInfo对象
      const baseInfo = new getBaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
      // 3.创建shopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo
      // 5创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate>0) {
        commentInfo = data.rate.list[0]
      }
      
      this.setData({
        topImages:topImages,
        baseInfo:baseInfo,
        shopInfo:shopInfo,
        detailInfo:detailInfo,
        paramInfo : paramInfo,
        commentInfo:commentInfo
      })
    })
  },
  _getRecommends(){
    getRecommends().then(res=>{
      this.setData({
        recommendInfo:res.data.data.list
      })
    })
  },
  onAddCart(){
    const obj = {};
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title= this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    app.addToCart(obj);
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})