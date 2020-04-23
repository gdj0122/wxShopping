import {getCategory,getSubcategory, getDetail} from '../../service/category'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData:{},
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getcategory()
  },
  _getcategory(){
    getCategory().then(res=>{
      const categories = res.data.data.category.list;
      const categoryData = {}
      for (let i = 0;i<categories.length;i++){
        categoryData[i] = {
          subcategories:[],
          categoryDetail:[]
        }
      }
      this.setData({
        categories:categories,
        categoryData:categoryData
      })
      // 请求第一个类别数据
      this._getSubcategory(this.data.currentIndex)
      this._getDetail(this.data.currentIndex)
    })
  },
  _getSubcategory(currentIndex){
    const maitKey = this.data.categories[currentIndex].maitKey
    getSubcategory(maitKey).then(res=>{
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
            
    })
  },
  _getDetail(currentIndex){
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;
    getDetail(miniWallKey,'pop').then(res=>{
      const categoryData = this.data.categoryData
      categoryData[currentIndex].categoryDetail = res.data;
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e){
    const currentIndex = e.detail.curredIndex;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex);
    // this._getCategoryDetail(currentIndex)
  }
})