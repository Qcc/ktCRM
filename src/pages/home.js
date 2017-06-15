import React from 'react';
import { Carousel,Layout } from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import ProductCard from '../components/homeProductCard';
import '../styles/common.css';
import '../styles/home.css';
const { Content } = Layout;

class Home extends React.Component{
    componentDidMount() {
        document.title='主页-深圳市沟通科技有限公司';
    }

    render(){
        const settings = {
      autoplay: true,
      autoplaySpeed: 4000
        };
        return(
           <div>
              <KtHeaderComp active='home' theme='light'/>
                    <Carousel {...settings}>
                        <div className='home-banner'><img alt='轮播广告' src={'dinghuo'+require('../static/banner01.jpg')}/></div>
                        <div className='home-banner'><img alt='轮播广告' src={'dinghuo'+require('../static/banner02.jpg')}/></div>
                        <div className='home-banner'><img alt='轮播广告' src={'dinghuo'+require('../static/banner03.jpg')}/></div>
                        <div className='home-banner'><img alt='轮播广告' src={'dinghuo'+require('../static/banner04.jpg')}/></div>
                    </Carousel>
              <Content className='home-content'>
                  <div className='home-content-title'>
                    <h2>应用虚拟化</h2>
                  </div>
                  <a href="#ctbsAdv">
                  <ProductCard cardAlt='CTBS高级版' cardImg={'dinghuo'+require('../static/adv.jpg')} 
                               cardTitle='CTBS高级版' cardSubTitle='通用型应用虚拟化软件'/>
                  </a>    
                  <a href="#ctbsEnterprise">
                  <ProductCard cardAlt='CTBS企业版' cardImg={'dinghuo'+require('../static/enterprise.jpg')}
                                 cardTitle='CTBS企业版' cardSubTitle='跨平台的应用虚拟化软件'/>
                  </a>
                  <a href="#cloudApp">
                  <ProductCard cardAlt='沟通云桌面' cardImg={'dinghuo'+require('../static/cloudapp.jpg')}
                             cardTitle='沟通科技云桌面' cardSubTitle='极简型应用虚拟化软件'/>
                  </a>
              </Content>
              <KtFooterComp/>
            </div>
        );
    }
}
export default Home;

