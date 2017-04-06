import React from 'react';
import { Card } from 'antd';
import '../styles/productCard.css';

class HomeProductCard extends React.Component{

    static propTypes={
        cardAlt: React.PropTypes.string.isRequired,
        cardImg: React.PropTypes.string.isRequired,
        cardTitle: React.PropTypes.string.isRequired,
        cardSubTitle: React.PropTypes.string.isRequired
    }
    
    render(){
        return(
            <Card className='product-card' bodyStyle={{ padding: 0 }}>
                <div className="product-img">
                    <img alt={this.props.cardAlt} width="100%" src={this.props.cardImg} />
                </div>
                <div className="product-title">
                <h3>{this.props.cardTitle}</h3>
                <p>{this.props.cardSubTitle}</p>
                </div>
            </Card>
        )
    }
}
export default HomeProductCard;