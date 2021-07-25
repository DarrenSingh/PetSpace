import React, { Component } from "react";
import '../css/App.css'

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import SuccessAlert from './SuccessAlert';
import { filter, result, without } from "lodash";

class App extends Component {

  constructor(){
    //allows you to access component properties aka the parent component
    //also allows to use the this keyword
    super();
    //allows you to set properties within the class
    this.state = {
      lastIndex : 0,
      orderBy: 'aptDate',
      orderDir: 'desc',
      queryText: '',
      showAlert: false,
      myAppointments : []
    }
    //pass the current objects context(this) to the deleteAppointment method
    this.searchAppointment = this.searchAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.sleep = this.sleep.bind(this);
  }
  
  /** COMPONENT METHODS **/
  searchAppointment(query){

    this.setState({
        queryText: query
    });
  }

  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts,apt);
    this.setState({
      myAppointments : tempApts
    });
  }

  addAppointment(apt){
    let tempApts = this.state.myAppointments;
    apt.aptId = this.lastIndex;

    tempApts.unshift(apt);

    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1,
      showAlert: true
    });
  
    this.sleep(4000).then(() => { 
      this.setState({
        showAlert: false
      });
    });

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeOrder(category, direction){
    this.setState({
      orderBy: category,
      orderDir: direction
    });
  }

  setOrderBy(category){
    this.setState({
      orderBy: category
    });
  }

  setOrderDir(direction){
    this.setState({
      orderBy: direction
    });
  }

  toggleFormDisplay(){
    if(this.state.formDisplay){
      this.setState({
        formDisplay: false
      })
    } else {
      this.setState({
        formDisplay: true
      })
    }
  }

  /** LIFECYCLE METHODS **/
  componentDidMount(){
    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const apts = data.map(item => { 
        //use state prop to track index and set it to the key for template expression rendering 
        item.aptId = this.state.lastIndex;
        //increment the state by overriding it
        this.setState({lastIndex : this.state.lastIndex + 1})
        return item;
        })

        //setter method to alter state properties
      this.setState({
        myAppointments: apts,
        formDisplay: false
      });
    });
  }  

  render(){

    let order;
    let filteredApts = this.state.myAppointments;
    order = (this.state.orderDir === 'asc') ? 1 : -1;
    
    filteredApts = filteredApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(item => {
       return item['petName']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase()) ||
      item['ownerName']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase()) ||
      item['aptNotes']
      .toLowerCase()
      .includes(this.state.queryText.toLowerCase());
    });

    return (
        <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments 
                formDisplay={this.state.formDisplay}
                addAppointment={this.addAppointment}
                toggleFormDisplay={this.toggleFormDisplay}
                />
                { this.state.showAlert ? <SuccessAlert /> : null }
                <SearchAppointments 
                orderBy={this.state.orderBy}
                orderDir={this.state.orderDir}
                searchAppointment={this.searchAppointment}
                changeOrder={this.changeOrder}
                />
                {/* pass a property to the ListAppointments component and access it in the component using props */}
                <ListAppointments 
                appointments={filteredApts}
                deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      );
  }

}

export default App;