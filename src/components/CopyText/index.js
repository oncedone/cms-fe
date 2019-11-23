import { Component } from 'react';
import { message } from 'antd'
import _ from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard';
export default class CopyText extends Component {
  copy = (value)=>{
    if(_.isUndefined(value) || _.isNull(value)) {
     message.info('请选择要复制的内容！') 
     return
    }
    if (window.clipboardData && !window.clipboardData.setData('Text', value)) {
      message.error(`复制失败,请先在浏览器设置允许复制`);
    } else {
      message.success(`复制内容成功`);
    }  
  }
  render() {
    const { data = '' } = this.props;
    const clipStr = _.isArray(data) ? data.join(',') : data
    return (
      <CopyToClipboard text={clipStr} onCopy={this.copy}>
          {this.props.children}
      </CopyToClipboard>
    )
  }
}