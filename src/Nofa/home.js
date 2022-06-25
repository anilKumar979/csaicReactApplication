import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

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
        if (props.match.params.id) {


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


                <div className="AB434-CSS">

                    <div className="position-relative row form-group row-height">
                    <div className="col-lg-2"></div>
                        <div className="col-lg-8 ">
                            <div className="homecsss">
                                <Link to={"/region"}>CUSTOMER SEARCH <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                                <Link to={"/sales"}>SALES REPRESANTATIVE <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default RegionView;