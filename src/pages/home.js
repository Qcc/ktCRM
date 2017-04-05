import React from 'react';
import { Carousel } from 'antd';
import KtHeaderComp from '../components/ktheadercomp';
import KtFooterComp from '../components/ktfootercomp';
import '../styles/common.css';


class Home extends React.Component{
    componentDidMount() {
        document.title='主页-深圳市沟通科技有限公司';
    }

    render(){
        return(
           <div>
              <KtHeaderComp active='home'/>
              <Carousel autoplay>
                <div><img src='../static/banner01.jpg' alt='轮播广告' /></div>
                <div><img src='../static/banner02.jpg' alt='轮播广告' /></div>
                <div><img src='../static/banner03.jpg' alt='轮播广告' /></div>
                <div><img src='../static/banner04.jpg' alt='轮播广告' /></div>
              </Carousel>
              <KtFooterComp/>
            </div>
        );
    }
}
export default Home;

