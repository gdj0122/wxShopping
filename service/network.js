import {baseURL} from './config.js'
export default function (options){
	return new Promise((resolve,reject)=>{
		wx.request({
			url:baseURL +　options.url,
			method:options.method || 'get',
			data:options.data || {},
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}