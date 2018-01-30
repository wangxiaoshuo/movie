/**
 * Created by wangxiaoshuo on 2017/2/8.
 */
module.exports ={
    getEach:function(k,arr){
        for(var i in k){
            return arr.push(k[i])
        }
    }
}