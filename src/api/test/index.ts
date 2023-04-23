import request from '@/utils/request/index';

export const getListApi = (data: any) => {
  return request.post('daglpt-api/bizArchivesControl/basicList', data);
};
