// pages/cart/childerCpns/cart-list-item/cart-list-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type:Object,
      value:{}
    },
    index:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e){
      const goods = app.globalData.cartList.find(item=>
        item.iid == this.properties.goods.iid
      )
      goods.checked = !goods.checked
      const index = e.currentTarget.dataset.index;
      console.log(e);
      app.changeGoodsState(index, goods)
    }
  }
})
