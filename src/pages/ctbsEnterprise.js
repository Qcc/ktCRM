import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class CTBSEnterprise extends React.Component{
    componentDidMount() {
        document.title='CTBS-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="ctbsEnterprise"/>
             <div className="product-body">
                <div className="intrduction">
                    <div className="product-intrduction">
                        <h2>CTBS企业版</h2>
                        <p>沟通科技作为国内领先的应用虚拟化厂商，努力耕耘行业十几年，先后获得过国家多项创新型发明专利，
                            经过对各行业客户的大量需求分析，研发出了更适合中小企业的应用虚拟化产品云桌面。它改变了以往应用虚拟化的基础架构，
                            拥有更低的实施维护成本，更快的运行速度和更好的稳定性，相信会对中小企业的信息化建设贡献一份力量。</p>
                        <p>企业部署云桌面后，发布出去的应用，只需要确保服务器端运维支持即可，
                            远端用户通过云桌面虚拟化访问应用,迅速解决中小企业IT支持难题。</p> 
                        <p>云桌面提供便捷访问的同时并不牺牲安全性，由于云桌面采用应用虚拟化的方式，天生就具有安全的优势。
                                用户登录云桌面后，操作应用软件，云桌面会将服务器端的界面变化增量经过加密后发送到客户端，
                                互联网传输与用户端并没有真实的业务数据。这样做到了操作与数据隔离，成为了企业的安全堡垒。</p>                      
                    </div>
                    <div className="product-wrap">
                          <img  alt="沟通科技云桌面" src={require("../static/ctbsEnterprise_1.jpg")} />
                    </div>
                </div>
                <div className="features">
                    <div className="features-first">
                        <h3>部署简单</h3>
                        <p>不需要专业知识，用户自己就可以搞定，安装即可使用，没有复杂的配置设置。免去实施运维烦恼。</p>
                    </div>
                    <div className="features-second">
                        <h3>支持跨平台</h3>
                        <p>服务器端支持Windows Server 和Win7等系统，客户支持Windows、IOS、Android系统</p>
                    </div>
                    <div className="features-third">
                        <h3>高效稳定</h3>
                        <p>沟通科技提供强大的链路负载与链路加速服务，只要能上网就能够使用云桌面，确保应用交付。</p>
                    </div>    
                </div>
                <div className="topology-img">
                    <h2>CTB高级版部署图</h2>
                    <img alt="云桌面部署图" src={"dinghuo"+require("../static/topology-cloudapp.png")} />
                </div>     
                <div className="customer-img">
                    <h2>我们的客户</h2>
                    <img alt="云桌面部署图" src={"dinghuo"+require("../static/customer-img.png")} />
                </div>            
            </div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default CTBSEnterprise;