import React from 'react';
import {RaisedButton, FlatButton, CardText} from 'material-ui';
import {Chart} from 'chart.js';
import {Link} from "react-router";

export default class ChartView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      viewChart: false
    }
  }

  render() {
    return(
      <div><CardText>You chose: {this.props.option}</CardText>
      <Link to="/"><RaisedButton secondary={true} label="Back to Polls" /></Link>
      { this.state.viewChart ? <canvas id="myChart" width="400" height="400"></canvas>
        : <RaisedButton primary={true} label="View Results" onClick={this.sortData.bind(this)}/>
      }
      </div>
    )
  }


sortData() {
  let newArray = this.state.data.slice();
  for (var option in this.props.poll.options) {
    let choice = this.props.poll.options[option];
    let count = this.props.poll.votes[this.props.poll.options[option]];
    if (count === undefined) {
      count = 0;
    }
    console.log("option: %s", choice);
    console.log("vote: %s", count);
    console.log(newArray);
    newArray.push(this.props.poll.votes[this.props.poll.options[option]]);
    console.log(newArray);
    }
  this.setState({ data: newArray},
    // console.log(this.state.data);
    this.renderChart.bind(this)
  );
  this.setState({ viewChart: true });
  }

renderChart() {
var ctx = document.getElementById("myChart");
console.log("Chart is rendering");
console.log(this.state.data);
console.log(this.props.poll.options);
let labels = this.props.poll.options;
let data = this.state.data;
console.log(labels);
console.log(data);
let myChart = new Chart(ctx, {

    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
          label: '# of Votes',
          data: data,
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

}
