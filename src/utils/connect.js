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
    // console.log("调用了fecth =",'url',url,'method',method,'params:', params);
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
        if(data.status === 200){
            // console.log("成功获取到数据 ",JSON.stringify(data,null,4));
            callback(data);
        }else{
            callback(null);          
            // console.log("服务器错误 ",JSON.stringify(data,null,4));          
        }
        })
    .fail((err,msg)=>{
        // console.log("err ",err,"msg ",msg);
        callback(null);
    });
  };

//伙伴登录
//export const login = rootUrl+"/public/user/login.api";
//kouton登录
export const login = rootUrl+"/public/user/koutonlogin.api";
//退出
export const logout = rootUrl+"/public/user/logout.api";
//查询单个license
//参数 licKey=XXXX-XXXX-XXXX-XXXX
export const querylicense = rootUrl+'/protected/license/queryLicense.api';
//修改密码
export const modifyPassword = rootUrl+'/public/user/modifyPassword.api';
//验证码 api 
export const validateCodeImgURL = rootUrl + "/public/user/validateCodeImg.api";
//读取伙伴信息
export const AccountInfo = rootUrl + "/protected/partner/read.api";
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
//生成正式license
export const generateFormal = rootUrl+"/protected/license/generateFormal.api";
//临时license 延期 加点
export const addUserNumberAndDelay = rootUrl+"/protected/license/addUserNumberAndDelay.api";
//临时license 获取还可延期的天数
export const getSumDelayDays = rootUrl+"/protected/license/getSumDelayDays.api";
//查询库存
export const query = rootUrl+"/protected/stock/query.api";
// 出货总数 明细
export const getLicActPager = rootUrl+"/protected/license/getLicActPager.api" 
// 采购总数 明细
export const getOrderPagerByPartner = rootUrl+"/protected/order/getPager.api"



// addUserNumberAndDelay(String licKey, int addUserNumber, int delayDays, 
//     		String endUserCompany, String endUserName, String endUserPhone, String endUserEmail)

// 查询累计延期天数接口：getSumDelayDays，entity字段返回如下：
// {
//     sumDelayDays: 3,
//     maxDelayDays: 15
// }
/*
 {
                "id": 18,
                "type": 2,
                "key": "0115-902B-C327-92B1",
                "isTrail": 1,
                "userNumber": 3,
                "delayDays": null,
                "expirationDate": "2017-05-13",
                "user": {
                    "id": 6,
                    "user": null,
                    "password": null,
                    "disable": null,
                    "employee": null,
                    "roles": null,
                    "salesUser": false,
                    "partner": false
                },
                "product": {
                    "productId": 3,
                    "productName": "云桌面",
                    "productVersion": "4.0",
                    "productPrice": null
                },
                "actionDatetime": "2017-04-28 11:50:29",
                "resultCode": null,
                "resultMsg": null,
                "endUserCompany": "云桌面测试",
                "endUserName": "发给",
                "endUserPhone": "1234564654",
                "endUserEmail": "798@456.com"
            },
*/