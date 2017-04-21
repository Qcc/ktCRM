import React from 'react';
import { Popconfirm, Switch, message } from 'antd';

class LicGenu extends React.Component {
  
   
   
  handleVisibleChange = (visible) => {
    message.success('Next step.11');
  }
  render() {
    return (
        <Popconfirm visible={false} onVisibleChange={this.handleVisibleChange}>
          <a href="#">Delete a task</a>
        </Popconfirm>
      
    
    );
  }
}

export default LicGenu;