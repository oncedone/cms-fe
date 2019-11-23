import { Component } from "react";
import PropTypes from 'prop-types';
const { globalConfig: { permissions = [] } } = window;

const hasPermission = (codes = []) => {
  let flag = codes.some(code => {
    return permissions.some(perm => perm.code === code)
  });
  return !!flag
}

export const wrapAuth = (ComposedComponent) => class WrapComponent extends Component {
  static propTypes = {
    authKey: PropTypes.array.isRequired,
    userId: PropTypes.string
  };

  render() {
    const { codes = [] } = this.props;
    const isShow = hasPermission(codes);
    return isShow?<ComposedComponent {...this.props}/>:null
  }
}

export const hasPerm = (code = []) => hasPermission(code);
