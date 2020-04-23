// pages/category/g-menu/g-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    curredIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e){
      const curredIndex = e.currentTarget.dataset.index;
      this.setData({
        curredIndex
      })
      this.triggerEvent('menuClick',{curredIndex})
    }
  }
})
