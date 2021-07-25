import React, { Component } from 'react';

class SuccessAlert extends Component {

    constructor(props){
        super(props);
        this.state = {
            alertMessage: ''
        }
    }

    render(){

        return(
            <div class="alert alert-warning my-2 text-center font-weight-bold" role="alert">
                Appointment Successfully Added
            </div>
        )
    }

}

export default SuccessAlert;