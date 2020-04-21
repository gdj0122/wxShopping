//app.js
App({
  onLaunch: function () {
    // 登录
  },
  addToCart(obj){
    const oldInfo = this.globalData.cartList.find(item=>item.iid==obj.iid)
    if (oldInfo) {
      oldInfo.cound += 1 
    }else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
  },
  globalData(){
    cartList:[]
  }
})