import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import adminServices from '../services/adminServices';
import csaicServices from '../services/csaicServices';
import moment from "moment";
import CustomDropdown from "./CustomDropdown";
import CustomDropdownSales from "./CustomDropdownSales";
import Tabs from './TabComponent/Tabs'
const NofaCreation = (props) => {
    console.log(props.msg);
    const [region, setregion] = React.useState([]);
    const [show, setShow] = useState(false);
    const [loader, setLoader] = React.useState(false)
    const handleClose = () => setShow(false);
    const [regionId, setRegionId] = useState(sessionStorage.getItem('regionId'));
    const [regionlist, setregionList] = React.useState([]);
    const [customerList, setcustomerList] = React.useState([]);
    const [hide, setHide] = React.useState(true)
    const [customer, setcustomer] = React.useState([]);

    // const handleShow = () => setShow(true);


    const history = useHistory();

    const handleShow = (id) => {
        setHide(false)
        if (id) {


            const datavalue = {
                CustID: id
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


    }


    const UploadNofa = (id) => {
        // con setLoader(false)sole.log("partyid", user.PARTIES_ID)
        setLoader(true)
        const datavalue = {
            RegionID: id
        }

        csaicServices.getCustomerByRegionId(datavalue).then(
            response => {
                setLoader(false)
                var res = response.data.data;
                setregion(res)

                // console.log("goor")
            },
            error => {
            }
        );

    }

    useEffect(() => {
        setLoader(true);

        csaicServices.getEmpSalesList().then(
            response => {
                console.log(response.data.data)
                setcustomerList(response.data.data)
                setLoader(false);
            },
            error => {
            }
        );
        // UploadNofa();
        setTimeout(function () {

            const user = JSON.parse(sessionStorage.getItem('user'));
            const RE = JSON.parse(sessionStorage.getItem('regionId'));
            console.log(RE)


        }, 100);


    }, []);




    const renderHeader = () => {
        let headerElement = ['Cust. Name', 'Cust. Phone', 'Sales Rep Name', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return region && region.map(({ ID, NAME, PHONE, ADDRESS }) => {
            return (
                <tr key={ID}>

                    <td>{NAME}</td>
                    <td>{PHONE}</td>

                    <td>{ADDRESS}</td>
                    {/* <td>{moment(START_DATE).utc().format('DD-MM-yyyy hh:mm:ss')}</td>
                    <td>{moment(END_DATE).utc().format('DD-MM-yyyy hh:mm:ss')}</td> */}
                    {/* <td>{users && users.map(({ IDs, STATUS }) => {
                        return (
                            <div key={IDs}>{STATUS}</div>
                        )
                    })}</td> */}
                    <td className='opration2 widthff'>
                        <button className=" fourth btn btn-primary" onClick={() => handleShow(ID)}><i className="fa fa-eye" aria-hidden="true"></i> View</button>
                    </td>
                </tr>
            )
        })
    }
    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };
    const handleCitySelect2 = (e) => {
        setHide(true)
        UploadNofa(e.target.value);
    }
    return (

        <div className="container">


            <div className="row">
                {loader ?
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                    : <></>
                }
            </div>

            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-list" aria-hidden="true"></i> CSAIC SEARCH </h4></div>
                    <div className="col-lg-3"><a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
                </div>
                <div className="position-relative row form-group">
                    <div className="col-lg-3">
                        <h2 className='H2TEXT'>SALES REPRESANTATIVE</h2>
                    </div>
                    <div className="col-lg-9">
                        {/* <input className="form-control" type="text" placeholder="Search here" /> */}
                        {/* <CustomDropdownSales /> */}

                        <select className="form-control" onChange={e => handleCitySelect2(e)}>
                            <option value="">Select</option>
                            {customerList.map((country, key) => (
                                <option key={key} value={country.ID}>
                                    {country.EmpName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="AB434-CSS">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <table id='employee' className="table">
                                <thead>
                                    <tr>{renderHeader()}</tr>
                                </thead>
                                <tbody>
                                    {renderBody()}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </div>
            <div className="prviewcss">
                <div className="position-relative row form-group">
                    {hide ? <></> :
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
                    }
                </div>
            </div>



            <div>

            </div>

        </div>
    );
};
export default NofaCreation