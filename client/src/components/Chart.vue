<template>
	<div>
	    <h2>Flow Meter AR332</h2>
	    <p><strong>Serial no.</strong> 
	    AR5345-454 &nbsp;&nbsp;<strong>Location</strong> Sector 7G</p>
	    <canvas id="myChart" width="100%" height="30vh"></canvas>
	    <div>
	    <button class="btn btn-secondary" @click="realtimeChart">Real-time</button> 
	    <button class="btn btn-secondary" @click="hourlyChart">Hourly</button> 
	    <button class="btn btn-secondary" @click="dailyChart">Daily</button> 
	    <button class="btn btn-secondary" @click="weeklyChart">Weekly</button> 
	    <button class="btn btn-secondary" @click="monthlyChart">Monthy</button>
	    </div>
   </div>

</template>


<script>
import Chart from 'chart.js';
var myChart;
var myInterval;

export default{
	data: function(){
	  return {
	    show_options: false, 
	    time_points: 10
	  } 
	}, 
	methods: {
	  register(){
	    this.$router.push('/devices')
	  },
	  realtimeChart(){
	  	let ctx = this.$el.querySelector("#myChart");
	  	if(myChart){
	  		myChart.destroy();
	  	}
	  	if(myInterval){
	  		clearInterval(myInterval);
	  	}
		myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: [Math.floor((Math.random() * 5) + 1),Math.floor((Math.random() * 5) + 1),Math.floor((Math.random() * 5) + 1),Math.floor((Math.random() * 5) + 1)],
		        datasets: [{
		            //label: null,
		            data: [2,3,5,2],
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
		var that = this;
		myInterval = setInterval(function(){ 
			myChart.data.datasets[0].data.push(Math.floor((Math.random() * 5) + 1));
			myChart.data.labels.push(new Date().toLocaleTimeString())
			if(myChart.data.labels.length > that.time_points){
				myChart.data.datasets[0].data.shift();
				myChart.data.labels.shift();
			}
			myChart.update();

		}

		, 1000)
	  },

	  dailyChart(){
	  	if(myChart){
	  		myChart.destroy();
	  	}
	  	if(myInterval){
	  		clearInterval(myInterval);
	  	}

	  	var days = [new Date()];
	  	
	  	var data = [Math.floor((Math.random() * 5) + 1)]
	  	for(var i=0;i<10;i++){
	  		var last_day = days[days.length-1];
	  		var previous_day = new Date();
	  		previous_day.setDate(last_day.getDate() - 1); 
	  		days.push(previous_day)
	  		data.push(Math.floor((Math.random() * 5) + 1))
	  	}
	  	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	  	days = days.map( day => day.toLocaleDateString("en-US", date_options)).reverse();
	  	let ctx = this.$el.querySelector("#myChart");
		myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: days,
		        datasets: [{
		            //label: null,
		            data: data,
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255,99,132,1)',
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
	  }, 

	  weeklyChart(){
	  	if(myChart){
	  		myChart.destroy();
	  	}
	  	if(myInterval){
	  		clearInterval(myInterval);
	  	}

	  	var days = [new Date()];
	  	
	  	var data = [Math.floor((Math.random() * 5) + 1)]
	  	for(var i=0;i<10;i++){
	  		var last_day = days[days.length-1];
	  		var previous_day = new Date();
	  		previous_day.setDate(last_day.getDate() - 7); 
	  		days.push(previous_day)
	  		data.push(Math.floor((Math.random() * 5) + 1))
	  	}
	  	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	  	days = days.map( day => day.toLocaleDateString("en-US", date_options)).reverse();
	  	let ctx = this.$el.querySelector("#myChart");
		myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: days,
		        datasets: [{
		            //label: null,
		            data: data,
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255,99,132,1)',
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
	  }, 

	  monthlyChart(){
	  	if(myChart){
	  		myChart.destroy();
	  	}
	  	if(myInterval){
	  		clearInterval(myInterval);
	  	}

	  	var days = [new Date()];
	  	days[0].setDate(1);
	  	
	  	var data = [Math.floor((Math.random() * 5) + 1)]
	  	for(var i=0;i<10;i++){
	  		var last_day = days[days.length-1];
	  		var previous_day = new Date();
	  		previous_day.setMonth(last_day.getMonth() - 1); 
	  		previous_day.setDate(1);
	  		days.push(previous_day)
	  		data.push(Math.floor((Math.random() * 5) + 1))
	  	}
	  	var date_options = { year: 'numeric', month: 'short', day: 'numeric' };
	  	days = days.map( day => day.toLocaleDateString("en-US", date_options)).reverse();
	  	let ctx = this.$el.querySelector("#myChart");
		myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: days,
		        datasets: [{
		            //label: null,
		            data: data,
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255,99,132,1)',
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
	  }, 

	  hourlyChart(){
	  	if(myChart){
	  		myChart.destroy();
	  	}
	  	if(myInterval){
	  		clearInterval(myInterval);
	  	}

	  	var ahora = new Date();
	  	ahora.setMinutes(0);
	  	ahora.setSeconds(0);
	  	var hours = [ahora];
	  	
	  	var data = [Math.floor((Math.random() * 5) + 1)]
	  	for(var i=0;i<10;i++){
	  		var last_hour = hours[hours.length-1];
	  		var previous_hour = new Date();
	  		previous_hour.setHours(last_hour.getHours() - 1); 
	  		previous_hour.setMinutes(0);
	  		hours.push(previous_hour)
	  		data.push(Math.floor((Math.random() * 5) + 1))
	  	}
	  	var date_options = { minute: 'numeric', hour: 'numeric' };
	  	hours = hours.map( hour => hour.toLocaleTimeString("en-US", date_options)).reverse();
	  	let ctx = this.$el.querySelector("#myChart");
		myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: hours,
		        datasets: [{
		            //label: null,
		            data: data,
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255,99,132,1)',
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


	},
	mounted(){
		this.realtimeChart();


	}

}
/*

*/

</script>



<style>
h2 {
	float: none;
}



</style>