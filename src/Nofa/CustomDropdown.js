import React from 'react'
import csaicServices from '../services/csaicServices';

export const CustomDropdown = (props) => (
  <div className="">
    <strong>{props.NAME}</strong>
    <select
      className="form-control"
      name="{props.NAME}"
      onChange={props.onChange}
    >
     
      {props.options.map((item, index) => (
        <option key={index} value={item.ID}>
          {item.NAME}
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
    csaicServices.getRegionList().then(
        response => {
            console.log(response.data.data)
            this.setState({ collection: response.data.data })
        },
        error => {
        }
    );
  }
  onChange = (event) => {
    console.log(event.target.value);
    // this.props.event.target.value;
    this.setState({ value: event.target.value })
    sessionStorage.setItem('regionId', event.target.value);

  }
 
  render() {


    return (
     <>
        <h2 className='H2TEXT'>CUSTOMER SEARCH</h2>
       
        <CustomDropdown
          name={this.state.NAME}
          options={this.state.collection}
          onChange={this.onChange}
          
        />
      </>
    )
  }
}