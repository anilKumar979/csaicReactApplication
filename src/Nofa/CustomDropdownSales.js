import React from 'react'
import csaicServices from '../services/csaicServices';
export const CustomDropdown = (props) => (
  <div className="">
    <strong>{props.EmpName}</strong>
    <select
      className="form-control"
      name="{props.EmpName}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.EmpName}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.ID}>
          {item.EmpName}
        </option>
      ))}
    </select>
  </div>
)
export default class CustomListDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
  componentDidMount() {
    csaicServices.getEmpSalesList().then(
        response => {
            console.log(response.data.data)
            this.setState({ collection: response.data.data })
        },
        error => {
        }
    );
  }
  onChange = (event) => {
    console.log(event);
    this.setState({ value: event.target.value })
  }
  render() {
    return (
     <>
        <h2 className='H2TEXT'>SALES REPRESANTATIVE</h2>
        <CustomDropdown
          name={this.state.EmpName}
          options={this.state.collection}
          onChange={this.onChange}
        />
      </>
    )
  }
}