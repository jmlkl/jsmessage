function messageSystem() {
    this.messageMasterElement = undefined;
    this.messageDefaultClass = undefined;
    this.messageIdPrefix = undefined;
    this.messages = [];

    this.AddMessage = function( _msg=undefined, _dtime=undefined, style=this.messageDefaultClass ) {

        if( _msg == undefined ) _msg = "Hello!" + Date.now();
        //var _id = msgSystem.AddMessage( message , killTime, style );
    

        let _time = Date.now();
        let _content = document.createTextNode( _msg );
        let _div = document.createElement("div");
       
        // if( _dtime != undefined) {
        //     let _element = document.getElementById( _id );
        //     setTimeout( function() { _element.remove();} , killTime );
        // }

        _div.appendChild( _content );
        _div.className = style;
        _div.id = this.messageIdPrefix + _time;
        var _element = this.messageMasterElement.appendChild( _div );
        //var _element = this.messageMasterElement.insertBefore(_div , this.messageMasterElement.childNodes[0] )    //insert to first (recent & old delete are then reversed!)
        if( _dtime == undefined ) { //easy fix that there is no need to look up array thru for elements that will be deleted via timeout
            this.messages.push( new messageContainer() );
            this.messages[this.messages.length-1].id = _div.id;
        } else {
            setTimeout( function() { _element.remove();} , _dtime );
            console.log("KILL ME " + _dtime + "s");
        }
        
        return _div.id;
    };

    this.DeleteOld = function() {
        if( this.messages.length > 0 ) {
            let _data = this.messages.shift();
            while( _data == undefined && this.messages.length > 0 ) {
                _data = this.messages.shift();
            }
            if( _data != undefined ) {
                let _element = document.getElementById( _data.id );
                _element.remove();

            }
        }
    }

    this.DeleteRecent = function () {
        if( this.messages.length > 0 ) {
            let _data = this.messages.pop();
            while( _data == undefined && this.messages.length > 0 ) {
                _data = this.messages.shift();
            }
            if( _data != undefined ) {
                let _element = document.getElementById( _data.id );
                _element.remove();
        
            }
        }
    }
};

function messageContainer() {
    this.id = undefined;
    this.creationTime = Date.now();
};

function AddMessage( msgSystem, message = undefined, killTime = undefined, style = 'message' ) {

    if( message == undefined ) message = "Hello!" + Date.now();
    var _id = msgSystem.AddMessage( message , killTime, style );

    if( killTime != undefined) {
        var _element = document.getElementById( _id );
        setTimeout( function() { _element.remove();} , killTime );
    }
}

// function DeleteMessageOld(msgSystem) {

//     var _data = msgSystem.messages.shift();
//     if( _data != undefined ) {
//         var _element = document.getElementById( _data.id );
//         _element.remove();

//     }
// }

// function DeleteMessageRecent(msgSystem) {

//     var _data = msgSystem.messages.pop();
//     if( _data != undefined ) {
//         var _element = document.getElementById( _data.id );
//         _element.remove();

//     }
// }
