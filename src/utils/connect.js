import reqwest from 'reqwest';
//根路径
let rootUrl = 'http://192.168.200.104:8080/dinghuo'
/*
ajax请求函数
@url 请求url
@callback 请求结果处理函数
@method 请求方法，默认GET
@params 请求参数对象
*/
export function fetch(url,callback,method='GET',params = {}){
    console.log("调用了fecth =",'url',url,'method',method,'params:', params);
    reqwest({
      url: url,
      method: method,
      crossDomain: true,                  //跨域
      withCredentials: true,              //跨域时带Cookie
      data: {
        //results: 10,
        ...params,
      },
      type: 'json',
    })
    .then((data) => {
        if(data.status !== 200 && data.errorCode !== 0){
          console.log("服务器错误 ",JSON.stringify(data,null,4));          
          return;
        }
        console.log("成功获取到数据 ",JSON.stringify(data,null,4));
        callback(data);
        })
    .fail((err,msg)=>{
        console.log("err ",err,"msg ",msg);
        callback({});
    });
  };

//查询单个license
//参数 licKey=XXXX-XXXX-XXXX-XXXX
export const querylicense = rootUrl+'/protected/license/queryLicense.api'
//修改密码
export const modifyPassword = rootUrl+'/public/user/modifyPassword.api';
//验证码 api 
export const validateCodeImgURL = rootUrl + "/public/user/validateCodeImg.api";
//获取临时授权完整列表 GET
export const licTemp = 'http://192.168.200.100:3000/licTemp';
//查询产品库存
export const Inven = 'http://192.168.200.100:3000/inven';

export const Inven1='http://192.168.200.104:8080/dinghuo/protected/license/queryLicense.api';