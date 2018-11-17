var gameTitle = 'LTC_GameJam_Colors-thingy-stuff';

// displayBootText sets up a delay by given timer before displaying provided string
function displayBootText(gameText, newString, timer){
    setTimeout(function () {
        gameText.setText(newString);
    }, timer);
}

// get user device
function getUserDevice(){
    var newDataText = '';
    newDataText = (game.device.android) ? newDataText + 'android,': newDataText;
    newDataText = (game.device.iphone) ? newDataText + 'iphone,': newDataText;
    newDataText = (game.device.ipad) ? newDataText + 'ipad,': newDataText;
    newDataText = (game.device.windows) ? newDataText + 'windows,': newDataText;
    newDataText = (game.device.iOS) ? newDataText + 'iOS,': newDataText;
    newDataText = (game.device.linux) ? newDataText + 'linux,': newDataText;

    if(newDataText != ''){
        // remove last comma in newDataText
        newDataText = newDataText.substring(0, newDataText.length - 1);
    }
    return newDataText;
}

// get user browser
function getUserBrowser(){
    var newDataText = '';
    newDataText = (game.device.chrome) ? newDataText + 'chrome,': newDataText;
    newDataText = (game.device.safari) ? newDataText + 'safari,': newDataText;
    newDataText = (game.device.firefox) ? newDataText + 'firefox,': newDataText;
    if(newDataText != ''){
        // remove last comma in newDataText
        newDataText = newDataText.substring(0, newDataText.length - 1);
    }
    return newDataText;
}

// check supported audio from user device
function getUserAudioType(){
    var newDataText = '';
    newDataText = (game.device.mp3) ? newDataText + 'mp3,': newDataText;
    newDataText = (game.device.wav) ? newDataText + 'wav,': newDataText;
    newDataText = (game.device.ogg) ? newDataText + 'ogg,': newDataText;
    if(newDataText != ''){
        // remove last comma in newDataText
        newDataText = newDataText.substring(0, newDataText.length - 1);
    }
    return newDataText;
}

// Retrieve user data
function getUserData(){
    userData['device'] = getUserDevice();
    userData['browser'] = getUserBrowser();
    userData['audiotype'] = getUserAudioType();
}

var bootState = {
    create: function () {
        var timerDelta = 500;   // how much wait time to increment
        var bootString = 'Booting up';
        var gametextThankYou = game.add.text(0, 150, 'Thanks for playing', {font: '30px Courier', fill: '#fff'});
        var gametextGameTitle = game.add.text(0, 200, gameTitle, {font: '30px Courier', fill: '#fff'});
        var gametextBootString = game.add.text(0, 250, bootString, {font: '30px Courier', fill: '#fff'});

        timer = 500;
        for(i = 1; i < 5; i++){
            timer += timerDelta;
            bootString += '.';
            displayBootText(gametextBootString, bootString, timer);
        }

        setTimeout(function(){
            getUserData();
        }, timer += timerDelta);

        // debug test
        if(DEBUG){
            setTimeout(function(){
                var gametextDebugger = game.add.text(0, 300, 'hello', {font: '30px Courier', fill: '#fff'});
                bootString ='';
                for (var i in userData){
                    bootString += userData[i] +',';
                }
                gametextDebugger.setText(bootString);
            }, timer += timerDelta);
        }

        // move on to next state
        setTimeout(function () {
            
            // TODO: determine if writing to player's computer is something to move forward with
            // ignore for now
            //var file = fopen('../config/ltc_config.txt')

            //Initial GameSystem (Arcade, P2, Ninja)
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //Initial Load State
            game.state.start('load');
        }, timer += timerDelta);

    }
};
