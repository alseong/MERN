import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

//How to write this with bind(this) in line 13
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a> 
    </td>
  </tr>
)

class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
    
        this.deleteExercise = this.deleteExercise.bind(this)
    
        this.state = {exercises: []};
      }
    
    // state = {
    //     exercises: []
    // }
 //node console = terminal , react console = google instoect
    componentDidMount() {
        console.log("Fdsfds")
        axios.get('http://localhost:5000/exercises/')
            .then(res => 
                this.setState({
                    exercises: res.data
                })
                )
            .catch(error => console.log(error))
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id) // what does it return? How does it work?
        })
      }
    
      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }
    

    render() {
        return (
            <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
        )
    }
}

export default ExerciseList

//Be aware of named vs dafult exports