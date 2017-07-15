var options = {
  trafficAffected: {
    passengerVehicles: 0,
    singleTrucks: 0,
    comboTrucks: 0
  },
  initialSpeed: 55,
  totalAffected: 0,
  passengerContribution: 0,
  truckContribution: 0,
  comboContribution: 0,
  passengerStopAddedCost: 83.47,
  truckStopAddedCost: 160.89,
  comboStopAddedCost: 721.77
};

function calculateStopAddedVOC(options) {
  options.trafficAffected.passengerVehicles = parseInt(options.totalAffected * options.passengerContribution);
  options.trafficAffected.singleTrucks = parseInt(options.totalAffected * options.truckContribution);
  options.trafficAffected.comboTrucks = parseInt(options.totalAffected * options.comboContribution);
  var passengerStopAddedVOC = parseFloat((options.trafficAffected.passengerVehicles * options.passengerStopAddedCost / 1000).toFixed(2));
  var truckStopAddedVOC = parseFloat((options.trafficAffected.singleTrucks * options.truckStopAddedCost / 1000).toFixed(2));
  var comboStopAddedVOC = parseFloat((options.trafficAffected.comboTrucks * options.comboStopAddedCost / 1000).toFixed(2));
  var totalVOC = passengerStopAddedVOC + truckStopAddedVOC + comboStopAddedVOC;
  console.log([options, {
    totalVOC: totalVOC,
    passengerVOC: passengerStopAddedVOC,
    truckVOC: truckStopAddedVOC,
    comboVOC: comboStopAddedVOC
  }]);
}

$(function(){
  $("#check").click(function(event){
    event.preventDefault();

    options.totalAffected = parseInt($("#total").val());

    options.passengerContribution = parseInt($("#pp").val())/100;
    options.truckContribution = parseInt($("#pt").val())/100;
    options.comboContribution = parseInt($("#pc").val())/100;

    calculateStopAddedVOC(options);
  });
});