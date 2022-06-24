import React, { useState, useEffect } from "react";


import { useHistory } from "react-router-dom";

import adminServices from '../services/adminServices';
import csaicServices from '../services/csaicServices';
import moment from "moment";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CustomDropdown from "./CustomDropdown";
import CustomDropdownSales from "./CustomDropdownSales";

const NofaCreation = (props) => {
    console.log(props.msg);
    const [region, setregion] = React.useState([]);
    const [show, setShow] = useState(false);
    const [loader, setLoader] = React.useState(false)
    const handleClose = () => setShow(false);
    const [regionId, setRegionId] = useState(sessionStorage.getItem('regionId'));
    const [regionlist, setregionList] = React.useState([]);
    const [customerList, setcustomerList] = React.useState([]);


    // const handleShow = () => setShow(true);


    const history = useHistory();

    const handleShow = (id, tit) => {

        history.push({
            pathname: '/view/'+id //change link based on what application they selected
        });
        sessionStorage.setItem("regionid", id)
        sessionStorage.setItem("regiontitle", tit)

    }

    const handleSubmit = (dataItem) => {

        // alert(JSON.stringify(dataItem, null, 2));

        adminServices.createNofa(dataItem).then(
            response => {

                sessionStorage.setItem('NofaId', response.nofaid);
                sessionStorage.setItem('NofaTitle', response.nofa_title);
                // alert("Nofa saved successfully")

                //window.location.href = "/faast/nofaDB";
                history.push({
                    pathname: '/form' //change link based on what application they selected
                });
                // setNofa(nofa)
            },
            error => {
            }
        );
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
        csaicServices.getRegionList().then(
            response => {
                console.log(response.data.data)
                setregionList(response.data.data)
                setLoader(false);
            },
            error => {
            }
        );
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

    const gotToPrivileges = (id, TITLE) => {

        history.push({
            pathname: '/privileges/' + id
        });
        sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('NofaTitle', TITLE);
    }
    const gotToGridTab = (id, TITLE) => {

        const datavalue = {
            "tab_name": "",
            "nofa_id": id,
            // "TAB_SEQUENCE": item.TAB_SQUENCE,
        }

        nofaServices.createNofaTabwithNofa(datavalue).then(
            response => {
                sessionStorage.setItem('NofaId', id);
                sessionStorage.setItem('NofaTitle', TITLE);
                history.push({
                    pathname: '/nofa-grid-tab'
                });
                // }

            },
            error => {
            }
        );
        // sessionStorage.setItem('NofaId', id);
        // sessionStorage.setItem('NofaTitle', TITLE);
    }
    // var mydate = new Date('2022-03-18T03:29:00.000Z');
    // var str = mydate.toString("yyyy-MM-DD hh:mm:ss");
    // alert(str);

    const renderHeader = () => {
        let headerElement = ['Cust. Name', 'Cust. Phone', 'Sales Rep Name', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    // const column = Object.keys(nofa[0]);
    // const renderHeader =()=>{

    //     return column.map((data)=>{
    //         return <th key={data}>{data}</th>
    //     })
    // }
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
    const handleCitySelect = (e) => {

        UploadNofa(e.target.value);
    }
    const handleCitySelect2 = (e) => {

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

                </div>
                <div className="position-relative row form-group">
                    <div className="col-lg-6">
                        {/* <input className="form-control" type="text" placeholder="Search here" /> */}
                        {/* <CustomDropdown/> */}
                        <h2 className='H2TEXT'>CUSTOMER SEARCH</h2>
                        <select className="form-control" onChange={e => handleCitySelect(e)}>
                            <option value="">Select</option>
                            {regionlist.map((country, key) => (
                                <option key={key} value={country.ID}>
                                    {country.NAME}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="col-lg-6">
                        {/* <input className="form-control" type="text" placeholder="Search here" /> */}
                        {/* <CustomDropdownSales /> */}
                        <h2 className='H2TEXT'>SALES REPRESANTATIVE</h2>
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
            {/* <div className="prviewcss">
                <div className="position-relative row form-group">

                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Home">
                        Hii, I am 1st tab content
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                        Hii, I am 2nd tab content
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                        Hii, I am 3rd tab content
                        </Tab>
                    </Tabs>
                </div></div>



            <div> 

            </div>*/}

        </div>
    );
};
export default NofaCreation