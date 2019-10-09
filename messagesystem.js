function messageSystem() {
    this.messageMasterElement = undefined; //document.getElementById("messageAreaDemo")
    this.messageClass = undefined;   //"message"
    this.messageIdPrefix = undefined;    //"message"
    this.messages = [];

    this.AddMessage = function( _msg, _dtime ) {
        let _time = Date.now();
        let _content = document.createTextNode( _msg );
        let _div = document.createElement("div");

        console.log("Dtime:" + _dtime);

        _div.appendChild( _content );
        _div.className = this.messageClass;
        _div.id = this.messageIdPrefix + _time;

        var _element = this.messageMasterElement.appendChild( _div );
        var _element = this.messageMasterElement.insertBefore(_div , this.messageMasterElement.childNodes[0] )    //insert to first (recent & old delete are then reversed!)
        if( _dtime == undefined ) { //easy fix that there is no need to look up array thru for elements that will be deleted via timeout
            this.messages.push( new messageContainer() );
            this.messages[this.messages.length-1].id = _div.id;
        }
        
        return _div.id;
    };
    this.DeleteRecentMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[ this.messageMasterElement.childNodes.length-1] )
    };
    this.DeleteOldMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[0] )
    };
    
    this.DeleteMessage = function ( _id ) {
        document.getElementById(_id).remove();
        //if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[0] )
    };
};

function messageContainer() {
    this.id = undefined;
    this.creationTime = Date.now();
};

function AddMessage( msgSystem, message = undefined, killTime = undefined ) {

    if( message == undefined ) message = "Hello!" + Date.now();
    var _id = msgSystem.AddMessage( message , killTime );
    //console.log( msgSystem.messages[ msgSystem.messages.length -1].id );
    if( killTime != undefined) {
        var _element = document.getElementById( _id );
        console.log( _element );
        // setTimeout( "msgSystem.DeleteMessage( _id )" , killTime );
        setTimeout( function() { _element.remove();} , killTime );
        // _element.remove();
    }
}

function iDelete( _id ) {
    let _element =  document.getElementById( _id );
    //console.log(_element);
    //console.log( msgSys.messages.find( _id ));
    _element.remove();
}

function DeleteMessageOld(msgSystem) {

    var _data = msgSystem.messages.shift();
    console.log( _data );
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        _element.remove();

    }
}

function DeleteMessageRecent(msgSystem) {

    var _data = msgSystem.messages.pop();
    console.log( _data );
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        //console.log( _element );
        _element.remove();

    }
}
