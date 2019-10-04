//FILE NOT IN USE, USING messagesystem.js!
var messages = [];

function message () {
    content = undefined;
    creationTime = undefined;
    id = undefined;
    me = undefined;

    this.releaseMe = function () {
        this.content = "Open a door, get him out of there!";
        this.me.innerHTML = this.content;
        //document.getElementById(this.id).innerHTML = this.content;
        

        //var _content = document.createTextNode( this.content );

        //let _element = document.getElementById( id );
        //me.parentElement.removeChild(me);
    }
};

function AddMessage() {
    let _index = messages.length;
    messages[_index]= new message();
    var _msg = "Hey Aruzo! I got a warning for you from Bald Man Sonetti.";
    var _time = Date.now();

    messages[_index].content = _msg;
    messages[_index].creationTime = _time;
    messages[_index].id = "message" + _time;

    var _content = document.createTextNode( messages[_index].content + " " + messages[_index].creationTime );
    var _div = document.createElement("div");
    _div.appendChild( _content );
    _div.className = "message";
    _div.id = "message" + _time;
    messages[_index].me = _div;

    var _element = document.getElementById("messageAreaDemo").appendChild( _div );
}

function DeleteMessage() {
    var _area = document.getElementById("messageAreaDemo");
    //var _id = messages[messages.length-1];
    //_area.removeChild( _area.childNodes[0] );
    messages[0].releaseMe();
}

function RefreshMessage() {
    var _logElement = document.getElementById("debugLog");
    var _area = document.getElementById("messageAreaDemo");

    var _str = _area.childNodes.length + "<br>";
    for( let i = 0; i < _area.childNodes.length; i++ ) {
        if( _area.childNodes[i].nodeType==1 ) _str += _area.childNodes[i].id + "<br>";
    }

    // for( let i = 0; i < messages.length; i++ ) {
    //     _str += messages[i].id + "<br>";
    // }
    _logElement.innerHTML = _str;
}