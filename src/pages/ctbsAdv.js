import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';

class CTBSAdv extends React.Component{
    componentDidMount() {
        document.title='CTBS-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active="ctbsAdv"/>
            <div className="product-body">
                <div className="intrduction">
                    <div className="product-intrduction">
                        <h2>CTBS高级版</h2>
                        <p>沟通科技作为国内领先的应用虚拟化厂商，努力耕耘行业十几年，先后获得过国家多项创新型发明专利，
                            经过对各行业客户的大量需求分析，研发出了更适合中小企业的应用虚拟化产品CTBS。它改变了以往应用虚拟化的基础架构，
                            拥有更低的实施维护成本，更快的运行速度和更好的稳定性，相信会对中小企业的信息化建设贡献一份力量。</p>
                        <p>企业部署CTBS高级版后，发布出去的应用，只需要确保服务器端运维支持即可，
                            远端用户通过CTBS虚拟化访问应用,迅速解决中小企业IT支持难题。</p> 
                        <p>CTBS提供便捷访问的同时并不牺牲安全性，由于CTBS采用应用虚拟化的方式，天生就具有安全的优势。
                                用户登录CTBS后，操作应用软件，CTBS会将服务器端的界面变化增量经过加密后发送到客户端，
                                互联网传输与用户端并没有真实的业务数据。这样做到了操作与数据隔离，成为了企业的安全堡垒。</p>                      
                    </div>
                    <div className="product-wrap">
                          <img  alt="沟通科技CTBS" src={"dinghuo"+require("../static/ctbsAdv_1.jpg")} />
                    </div>
                </div>
                <div className="features">
                    <div className="features-first">
                        <h3>强大的后端</h3>
                        <p>具备全面的后端管理平台，管理用户权限、分配资源，服务器管理，日志报表详细。</p>
                    </div>
                    <div className="features-second">
                        <h3>支持大并发</h3>
                        <p>服务器端支持Windows Server 系统，客户支持Windows系统，支持大并发</p>
                    </div>
                    <div className="features-third">
                        <h3>高效稳定</h3>
                        <p>沟通科技提供强大的链路负载与链路加速服务，只要能上网就能够使用CTBS，确保应用交付。</p>
                    </div>    
                </div>
                <div className="topology-img">
                    <h2>CTBS高级版部署图</h2>
                    <img alt="CTBS部署图" src={"dinghuo"+require("../static/topology-ctbs.png")} />
                </div>     
                <div className="customer-img">
                    <h2>我们的客户</h2>
                    <img alt="CTBS部署图" src={"dinghuo"+require("../static/customer-img.png")} />
                </div>            
            </div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default CTBSAdv;