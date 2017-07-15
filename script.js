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
  passengerDelayCost: 0,
  truckDelayCost: 0,
  comboDelayCost: 0,
  passengerStopAddedCost: 83.47,
  truckStopAddedCost: 160.89,
  comboStopAddedCost: 721.77,
  passengerAddedDelay: 5.84,
  truckAddedDelay: 8.07,
  comboAddedDelay: 20.72,
  results: {
    passengerStopAddedVOC: 0,
    truckStopAddedVOC: 0,
    comboStopAddedVOC: 0,
    totalAddedVOC: 0,
    passengerStopAddedDelayCost: 0,
    truckStopAddedDelayCost: 0,
    comboStopAddedDelayCost: 0,
    totalStopAddedDelayCost: 0
  }
};

function calculateStopAddedVOC(options) {
  options.trafficAffected.passengerVehicles = Math.round(options.totalAffected * options.passengerContribution);
  options.trafficAffected.singleTrucks = Math.round(options.totalAffected * options.truckContribution);
  options.trafficAffected.comboTrucks = Math.round(options.totalAffected * options.comboContribution);

  options.results.passengerStopAddedVOC = parseFloat((options.trafficAffected.passengerVehicles * options.passengerStopAddedCost / 1000).toFixed(2));
  options.results.truckStopAddedVOC = parseFloat((options.trafficAffected.singleTrucks * options.truckStopAddedCost / 1000).toFixed(2));
  options.results.comboStopAddedVOC = parseFloat((options.trafficAffected.comboTrucks * options.comboStopAddedCost / 1000).toFixed(2));
  options.results.totalAddedVOC = options.results.passengerStopAddedVOC + options.results.truckStopAddedVOC + options.results.comboStopAddedVOC;

  options.results.passengerStopAddedDelayCost = parseFloat((options.trafficAffected.passengerVehicles * options.passengerAddedDelay / 1000 * options.passengerDelayCost).toFixed(2));
  options.results.truckStopAddedDelayCost = parseFloat((options.trafficAffected.singleTrucks * options.truckAddedDelay / 1000 * options.truckDelayCost).toFixed(2));
  options.results.comboStopAddedDelayCost = parseFloat((options.trafficAffected.comboTrucks * options.comboAddedDelay / 1000 * options.comboDelayCost).toFixed(2));
  options.results.totalStopAddedDelayCost = options.results.passengerStopAddedDelayCost + options.results.truckStopAddedDelayCost + options.results.comboStopAddedDelayCost;

  console.log(options);
}

$(function(){
  $("#check").click(function(event){
    event.preventDefault();

    options.totalAffected = parseInt($("#total").val());

    options.passengerContribution = parseInt($("#pp").val())/100;
    options.truckContribution = parseInt($("#pt").val())/100;
    options.comboContribution = parseInt($("#pc").val())/100;

    options.passengerDelayCost = parseFloat($("#pdc").val());
    options.truckDelayCost = parseFloat($("#tdc").val());
    options.comboDelayCost = parseFloat($("#cdc").val());

    calculateStopAddedVOC(options);
  });
});