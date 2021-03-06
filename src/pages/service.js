import React from 'react';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import "../styles/service.css";
class Service extends React.Component{
    componentDidMount() {
        document.title='原厂服务-深圳市沟通科技有限公司';
    }
    render(){
        return(
            <div>
            <KtHeaderComp theme='light' active='service'/>
            <div className="service-body">
                <div className="service-nav">
                    <ul>
                        <li>渠道体系介绍</li>
                        <li>沟通科技渠道分工</li>
                        <li>面向渠道伙伴的服务</li>
                        <li>面向终端用户的服务</li> 
                        <li>服务标准及方式</li>
                    </ul>
                </div>
                <div className="service-content">
                    <h4>渠道体系介绍</h4>
                    <p>为了更好地为客户提供本地化服务，同时降低最终用户的有偿服务价格。沟通科技部分最终用户的售后服务通过分销商体系和系统集成商来提供。
                        由沟通科技对渠道伙伴提供技术支持，确保客户技术问题能得到及时有效解决。</p>
                        <div className="imgwarp">
                        <img alt="伙伴体系" src={'dinghuo'+require("../static/parnter.gif")}/>
                        </div>
                    <h4>沟通科技渠道分工</h4>
                        <ol>
                        <li>沟通科技向总代金牌经销商和购买原厂服务的客户直接提供技术服务。</li>
                        <li>总代经销商面向下游渠道或购买其服务的客户/项目合作渠道提供技术服务。总代不仅是沟通科技产品面向特定区域或市场的产品供应商，也是该区域或市场的服务产品供应商之一。</li>
                        <li>金牌渠道面向自身销售的客户提供技术服务。金牌渠道技术经过沟通科技厂商培训并通过考试获得沟通科技技术能力资格认证后，可为其客户提供技术服务。</li>
                        <li>项目型合作(非签约)渠道若配备沟通科技的技术认证技术人员，也可直接对其客户提供技术服务。</li>
                        </ol>
                        <img alt="服务等级" src={'dinghuo'+require("../static/service.gif")}/>                        
                    <h4>渠道伙伴提供的服务</h4>
                        <ol>
                        <li>电话支持服务。各地渠道伙伴根据合作的紧密程度，提供和沟通科技产品相关的电话支持服务，支持内容包括从产品咨询、方案选型，到测试试用、售后服务等，一站式的电话服务支持。</li>
                        <li>远程调试服务。各地渠道伙伴根据客户服务等级和需求，对售前、售后所涉及的技术问题，提供远程调试服务，以第一时间通过远程的方式就解决客户问题，恢复业务等。</li>
                        <li>上门支持服务。各地渠道伙伴根据客户服务等级和需求，对测试阶段和已购买使用的客户，提供上门测试、实施、调试、巡检等服务，以提供最全面的技术交流和支持服务。</li>
                    </ol>
                    <h4>沟通科技提供的服务</h4>
                        <ol>
                        <li>电话支持服务。4000755799呼叫中心面向渠道伙伴提供5x8小时的电话咨询服务，通过电话服务，及时回复渠道伙伴的技术疑问。</li>
                        <li>远程调试服务。技术支持QQ群面向渠道伙伴提供5x8小时的远程调试服务，通过远程调试服务，确保渠道伙伴及其客户的技术问题能及时处理和跟踪，并确保问题最终解决。</li>
                        <li>文档支持。深圳面向技术认证渠道和授权服务中心提供技术文档的在线支持，方便渠道伙伴通过在线的方式获取即时支持。</li>
                        <li>上门支持服务。沟通科技北京、上海、深圳分公司都配备资深工程师，针对渠道伙伴解决不了的技术难题等，提供陪同上门交流、测试和调试等服务，保障渠道伙伴的项目顺利完成，渠道客户的问题得到快速解决。</li>
                        <li>技术培训服务。沟通科技北京、上海、深圳分公司面向合作渠道提供产品培训和技术培训，不断提升渠道伙伴人员技术力量，从而确保客户能从渠道获得高质量的服务。</li>
                </ol>
                </div>
            </div>
            <KtFooterComp/>
            </div>
        );
    }
}

export default Service;