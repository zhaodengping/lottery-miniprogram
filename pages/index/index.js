Page({

  /**
   * 页面的初始数据
   */
  data: {
    awards: ['北京一套房', '北京两套房', '北京三套房', '上海一套房', '谢谢惠顾', '上海两套房', '上海三套房', '广东一套房', '广东两套房'],
    checkedIndex:-1,
    time:null,
    intervalTime:500,
    awardShow:'',
    showInfo:false,
    btnName:'立即抽奖',
    btnShow:true,
    isToggle:false,//刚开始时间逐渐变快，后来转化为时间变慢
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  check:function(){
    if(this.data.time){
      let that=this;
      let content=''
      if (this.data.checkedIndex==4){
        content='很遗憾，您未中奖'
      }else{
        content = `太幸运了，竟然中了${this.data.awards[this.data.checkedIndex]}`
      }
      wx.showModal({
        title: '提示',
        content,
        showCancel:false,
        success(res) {
          if (res.confirm) {
            that.setData({
              awardShow: content,
              showInfo: true,
              btnShow:false,
            })
          }
        },
      })
      clearInterval(this.data.time);
    }else{
      this.setData({
        btnName:'暂停'
      })
      this.data.time = setInterval(this.start, this.data.intervalTime)
    }
  },
  start(){
    clearInterval(this.data.time);
    if (!this.data.isToggle){
      this.data.intervalTime -= 49;
      this.toggle()
      if (this.data.intervalTime<50){
        this.data.isToggle = true;
      }
    }else{
      this.data.intervalTime += 100;
      this.toggle()
      if(this.data.intervalTime>1500){
        this.check()
      }
    }
  },

  toggle(){
    this.data.time = setInterval(this.start, this.data.intervalTime)
    if (this.data.checkedIndex > 7) {
      this.setData({
        checkedIndex: 0
      })
    } else {
      this.setData({
        checkedIndex: this.data.checkedIndex + 1
      })
    }
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
    clearInterval(this.data.time);
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