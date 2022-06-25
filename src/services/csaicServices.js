import axios from 'axios';
import authHeader from './Header';
const API_URL = 'http://localhost:9006/tenzinApi/tenzin/';

class csaicService {

 
    getRegionList() {
    return axios.get(API_URL+"getRegionList")
  }
  getEmpSalesList() {
    return axios.get(API_URL+"getEmpSalesList",{ headers: authHeader()})
  }
  getCustomerByRegionId(values) {
    return axios.post(API_URL + "getCustomerByRegionId", values)
  }
  getCustomerBySalesID(values) {
    return axios.post(API_URL + "getCustomerBySalesID", values)
  } 
  getCustomerByCustId(values) {
    return axios.post(API_URL + "getCustomerByCustId", values)
  }
 

}

export default new csaicService();