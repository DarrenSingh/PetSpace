import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment';

class ListAppointments extends Component {

    render(){

        // access appointments data which was passed down through the property name "appointment"
        // props are a one-way data bind feature (component --> subcomponent)
        // const listItems = this.props.appointments.map(item => (
        //     <div>
        //       <div>{item.petName}</div>
        //       <div>{item.ownerName}</div>
        //     </div>
        // ));

        return (
        <div className="appointment-list item-list mb-3">
            {/* utilize the prop 'appointments' that was passed down from the parent component 'App' */}
            {this.props.appointments.map(item => (
            <div className="pet-item col media py-3" key={item.aptId}>
                <div className="mr-3">
                <button className="pet-delete btn btn-sm btn-danger"
                onClick={() => this.props.deleteAppointment(item)}>
                {/* third-party component based icon used inside the button */}
                <FaTimes /></button>
                </div>

                <div className="pet-info media-body">
                <div className="pet-head d-flex">
                    <span className="pet-name">{item.petName}{item.apt}</span>
                    <span className="apt-date ml-auto">
                        {/* third-party component used from the react-moment module to format the date */}
                        {/* properties are passed to this component ^see moment library documentation */}
                        <Moment 
                        date={item.aptDate}
                        parse="YYYY-MM-DD hh:mm"
                        format="MMM-D-h:mma"
                        />
                    </span>
                </div>

                <div className="owner-name">
                    <span className="label-item">Owner: </span>
                    <span>{item.ownerName}</span>
                </div>
                <div className="apt-notes">{item.aptNotes}</div>
                </div>
            </div>))
          }
      </div>);

    }
}

export default ListAppointments;