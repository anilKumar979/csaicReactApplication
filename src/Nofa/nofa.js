import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import csaicServices from '../services/csaicServices';
import Tabs from './TabComponent/Tabs'

const RegionView = (props) => {
    console.log(props.match.params.id)
    const [customer, setcustomer] = React.useState([]);
    const [loader, setLoader] = React.useState(false)
    const history = useHistory();
    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };
    useEffect(() => {
       
       setLoader(true);
      if(props.match.params.id){

      
        const datavalue = {
            CustID: props.match.params.id
        }

        csaicServices.getCustomerByCustId(datavalue).then(
            response => {
                console.log(response.data.data)
                setcustomer(response.data.data)
                setLoader(false);
            },
            error => {
            }
        );
    }
        
       
        // UploadNofa();
   


    }, []);
    return (

        <div className="container">
            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-list" aria-hidden="true"></i> CSAIC SEARCH </h4></div>
                        <div className="col-lg-3"><a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
                </div>

                <div className="AB434-CSS">
                    <Tabs>
                        <div label="Customer Info" className="">
                            <div className="customerinn  ">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <p>Id</p>
                                    </div>
                                    <div className="col-lg-9">
                                        <p>{customer.ID}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="customerinn  ">
                                <div className=" row ">
                                    <div className="col-lg-3">
                                        <p>Name</p>
                                    </div>
                                    <div className="col-lg-9">
                                        <p>{customer.NAME}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="customerinn  ">
                                <div className=" row ">
                                    <div className="col-lg-3">
                                        <p>Phone</p>
                                    </div>
                                    <div className="col-lg-9">
                                        <p>{customer.PHONE}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div label="Address">
                        <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>Address</p>
                                </div>
                                <div className="col-lg-9">
                                    <p>{customer.ADDRESS}</p>
                                </div>
                            </div>
                            </div>
                            <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>City</p>
                                </div>
                                <div className="col-lg-9">
                                    <p>{customer.CITY}</p>
                                </div>
                            </div>
                            </div>
                            <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>State</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.STATE}</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>Zip Code</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.ZIP_CODE}</p>
                                </div>
                            </div>
                            </div>
                            <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>Country</p>
                                </div>
                                <div className="col-lg-9">
                                    <p>{customer.COUNTRY}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div label="Billing">
                        <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>Creadit Rating</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.CREDIT_RATING}</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>Region ID</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.REGION_ID}</p>
                                </div>
                            </div>
                            </div>
                            <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>Sales Rep ID</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.SALES_REP_ID}</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>Sales Rep Name</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.LAST_NAME}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div label="Comment">
                        <div className="customerinn  ">
                            <div className=" row ">
                                <div className="col-lg-3">
                                    <p>Comments</p>
                                </div>
                                <div className="col-lg-3">
                                    <p>{customer.COMMENTS}</p>
                                </div>
                            </div>
                            </div>
                        </div>




                    </Tabs>

                </div>
            </div>


        </div>
    );
};
export default RegionView