import reqwest from 'reqwest';

export function fetch(url,callback,method='GET',params = {}){
    console.log("调用了fecth =",'url',url,'method',method,'params:', params);
    reqwest({
      url: url,
      method: method,
      data: {
        //results: 10,
        ...params,
      },
      type: 'json',
    })
    .then((data) => {
        console.log("成功获取到数据 ",JSON.stringify(data,null,4));
        callback(data);
        })
    .fail((err,msg)=>{
        console.log("err ",err,"msg ",msg);
        callback({});
    });
  };
//获取临时授权完整列表 GET
export const licTemp = 'http://192.168.200.100:3000/licTemp';
/*
{
  "status": 200,
  "errorCode": 0,
  "message": "Success",
  "moreInfo": "",
  "entity": [
    {
      "id": 1,
      "key": 1,
      "cdkey": "FF97-A71D-5CF9-BDEA",
      "customer": "牡丹江市装名有限公司",
      "product": "CTBS高级版",
      "trial": "2002-11-08 21:06:44",
      "license": 109,
      "active": true
    },
  }
*/
//查询产品库存
export const Inven = 'http://192.168.200.100:3000/inven';
/*
{
  "status": 200,
  "errorCode": 0,
  "message": "Success",
  "moreInfo": "",
  "entity": [
    {
      "cloudAppCount":0
    },{
        "ctbsAdvCount":0,
    },{
        "ctbsEnterpriseCount":0,
    }]
}
*/