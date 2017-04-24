import React from 'react';
import { Button ,Modal,Icon,Tooltip } from 'antd';

class CopyIcon extends React.Component{
    state={
       text:'复制到剪贴板',
    }

    handleCopy(e){
      this.setState({text:'已复制'});
      console.log(e);
      let ele =e.target;
      console.log(ele);
      
    }
    onMouseOut(){
      this.setState({text:'复制到剪贴板'});
    } 
    render(){
      return(
         <Tooltip placement="topLeft" title={this.state.text}>
          <Button type='dashed' shape="circle" icon="copy" 
              onClick={(e)=>this.handleCopy(e)}
              onMouseLeave={()=>this.onMouseOut()} />
        </Tooltip>
      );
    }
}
class LicGenu extends React.Component {

  render() {
    return (
      <div>   
        <CopyIcon/>
      </div>
    );
  }
}

export default LicGenu;