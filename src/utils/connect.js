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
export function fetch(url,callback,params = {},method='POST'){
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
//读取伙伴信息
export const partenrInfo = rootUrl + "/protected/corp/read.api";
//读取伙伴帐号信息
export const partenrAccount = rootUrl + "/protected/employee/read.api";
//查询已发放的license 总数 正式版  试用版
export const licenseCount = rootUrl + "/protected/license/getLicenseCount.api";
//按照指定的分页参数查询数据
export const licensePager = rootUrl + "/protected/license/getLicensePager.api";
//按照指定分页查总数 与 数据
export const licenseCountPager = rootUrl + "/protected/license/getLicenseCountPager.api";
//申请临时试用license
export const generateTrail = rootUrl+"/protected/license/generateTrail.api";
//临时license 延期 加点
export const addUserNumberAndDelay = rootUrl+"/protected/license/addUserNumberAndDelay.api";
//临时license 延期 加点
export const getSumDelayDays = rootUrl+"/protected/license/getSumDelayDays.api";


//方法正式授权license
export const generateFormal = rootUrl + "/protected/license/generateFormal.api";





//获取临时授权完整列表 GET
export const licTemp = 'http://192.168.200.100:3000/licTemp';
//查询产品库存
export const Inven = 'http://192.168.200.100:3000/inven';

export const Inven1='http://192.168.200.104:8080/dinghuo/protected/license/queryLicense.api';

// addUserNumberAndDelay(String licKey, int addUserNumber, int delayDays, 
//     		String endUserCompany, String endUserName, String endUserPhone, String endUserEmail)

// 查询累计延期天数接口：getSumDelayDays，entity字段返回如下：
// {
//     sumDelayDays: 3,
//     maxDelayDays: 15
// }