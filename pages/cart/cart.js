// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    isSelectAll:true,
    totalPrice:0,
    totalCounter:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      cartList:app.globalData.cartList
    })
    // 设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList : app.globalData.cartList
      })
      this.changeData()
    }
    // 设置商品回调
    app.changeGoodsState = (index,goods) =>{
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 修改所有
      const isSelectAll = !this.data.cartList.find(item=>!item
        .checked)
      this.setData({
        isSelectAll: isSelectAll
      })
      this.changeData()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`
    });
    this.changeData()
  },
  onSelectAll(){
    if (this.data.isSelectAll) {
      this.data.cartList.forEach(element => {
        element.checked = false
      });
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else{
      this.data.cartList.forEach(element => {
        element.checked = true
      })
      this.setData({
        cartList:this.data.cartList,
        isSelectAll:true
      })
    }
    this.changeData()
  },
  changeData(){
    let totalPrice = 0;
    let counter = 0;
    
    for (let item of this.data.cartList){
      if(item.checked){
        counter++
        totalPrice += item.price * item.count
      }
    }
    console.log(counter, totalPrice)
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})