import request from '@/utils/request/index';

export const getVerifyCode = () => {
  return request.get(`/ssyqyd/sysUser/getVerifyCode`);
};
// 获取标签列表
export const loginApi = (data = {}) => {
  return request.post(`/ssyqyd/sysUser/login`, data);
};
