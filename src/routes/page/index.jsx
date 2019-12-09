import { Component } from 'react';
import { connect } from 'dva';

class Page extends Component {
  render() {
    return <div>hi, dva!</div>
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(Page);
