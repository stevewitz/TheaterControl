
module.exports.denonCommands={
    denonPowerOn:'PWON',
    denonPowerOff:'PWSTANDBY',
    denonPowerStatus:'PW?',
    denonInputBluray:'SIBD',
    denonInputDVD:'SIDVVD',
    denonZone3Off:'Z3OFF',
    denonZone2Off:'Z2OFF',
    denonVolumeUp:'MVUP',
    denonVolumeDown:'MVDOWN'
}

module.exports.send  = function(data){
    console.log('send',data);
   //do something
}
