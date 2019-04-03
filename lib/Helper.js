/***********************************  Configuration Vars ***********************************************/
var APPLICATION_TITLE = "PAB training exercise navigator"
var EXERCISE_TITLE = "PAB scan & print demonstration app"
var TEMPLATE_NAME = "Born_Template.xst";		// Name of Scan Template
var DOCUMENT_NAME = "My_App_Doc_";				// Name of Document
var SCAN_SERVER = "10.72.32.58";				// Scan Server IP Address
var SCAN_DESTINATION = "ftp";			// FTP Scan Folder Destination
var LOGIN_NAME = "ftpuser";					// FTP&Http Login Name
var LOGIN_PASSWORD = "Xerox123";					// FTP&Http Login Password
var HTTP_SCAN_PATH = "C:\\\\httpScans";			// HTTP Scan Folder Destination
var HTTP_SCRIPT_PATH = "/xerox.ashx";			// HTTP Script Path Location
var YOUR_EMAIL = "Rick.Born@xerox.com";	// Email Address
var EULA_KEY = "myapp.UserAcceptedEULA";		// Unique Key for local storage
//var PULL_PRINT_URL = "http://www.support.xerox.com/services/XTend_SS_062211.pdf"; //URL to Print ready media
var PULL_PRINT_URL = "https://www.xerox.co.uk/office/latest/SFTBR-50E.PDF"; //A4 doc




/**
* Helper.js.
* This file contains is a subset of the helper functions from the Demo program.
*
*/

/**
* This writes the message to the SR3 area if it exists.
*
* @param msg	message to write
* @param append	true = append
*/
function writeSR3( msg, append )
{
	if(append == undefined) append = true;
	var sr3 = document.getElementById( "xrx:StatusRegionSR3" );
	if(sr3 != null)
	{
		if(!append) sr3.innerHTML = "";
		sr3.appendChild( document.createTextNode( msg ) );
	}		
} 
 
/**
* This writes the message to the SR2 area if it exists.
*
* @param msg	message to write
* @param append	true = append
*/
function writeSR2( msg, append )
{
	if(append == undefined) append = true;
	var sr2 = document.getElementById( "xrx:StatusRegionSR2" );
	if(sr2 != null)
	{
		if(!append) sr2.innerHTML = "";
		sr2.appendChild( document.createTextNode( msg ) );
	}		
}

/**
* This calls the Session Api exit function to exit EIP mode.
*/
function exit()
{
	xrxSessionExitApplication( "http://127.0.0.1", callbackFailure );
}

/**
* This function disables/enables a Xerox widget while taking into 
* account the differences between Rev 1 and Rev 2.
*
* @param id			ID of widget
* @param disable	true=disable widget
*/
function disable(id, disable) {

    var node = document.getElementById(id);

    var version = getXeroxWidgetVersion();

    var action = "Addition";

    var val = "unselectable";

    if ((disable == undefined) || disable) {
        if (version == "Xerox Widgets Rev 1") {
            node.setAttribute('disabled', "true");
            val = "disabled";
        }
        else {
            node.setAttribute('unselectable', "true");
        }
    }
    else {
        if (node.hasAttribute('disabled')) {
            node.removeAttribute('disabled');
            val = "disabled";
        }
        else {
            if (node.hasAttribute('unselectable'))
                node.removeAttribute('unselectable');
        }
        action = "Removal";
    }
    xrxSendDomAttrModifiedEvent(node, false, false, val, null, null, action, true);
}

/**
* Function to replace characters in a string. Replacement is global. Necessary as current 
* browser has problems with String.replace().
*
* @param text	string to modify
* @param str	string to search for
* @param rstr	replacement string
* @return modified string
*/
function replaceChars( text, str, rstr )
{
	var index = text.indexOf( str );
	var result = "";
	while(index >= 0) 
	{
		result += ((index > 0)?text.substring( 0, index ):"");
		result += rstr;
		text = text.substring( index + str.length, text.length );
		index = text.indexOf( str );
	}
	return( result + text );
}

/**
* Function to find the nth occurence of a character in a string.
*
* @param string	string to search
* @param charr	char to search for
* @param nth	occurence of character in string
* @return location of nth character in string
*/
function nth_occurrence (string, charr, nth)
{
	var first_index = string.indexOf(charr);
	var length_up_to_first_index = first_index + 1;
	if (nth == 1) {
		return first_index;
	} else {
		var string_after_first_occurrence = string.slice(length_up_to_first_index);
		var next_occurrence = nth_occurrence(string_after_first_occurrence, charr, nth - 1);
		if (next_occurrence === -1)
		{
			return -1;
		} else {
			return length_up_to_first_index + next_occurrence;  
		}
	}
}

/**
* Lazy function that makes alot of assumptions on the request structure to find the request name.
*
* @param request	request string to pull name from
* @return the name of the request
*/
function getRequestName(request)
{
	var requestNameStart = request.indexOf("<soap:Body>") + 12;
	var requestNameEnd = request.indexOf(">", requestNameStart);
	if (request.indexOf(" ", requestNameStart) < requestNameEnd) requestNameEnd = request.indexOf(" ", requestNameStart);
	
	return request.substring(requestNameStart, requestNameEnd)
}

/**
* Lazy function that makes alot of assumptions on the response structure to find the FailedReason.
*
* @param response	response string to pull FailedReason
* @return the reason the request failed
*/
function getFailedReason(response)
{
	var failedReasonStart = response.indexOf("<faultstring>") + 13;
	var failedReasonEnd = response.indexOf("</faultstring>", failedReasonStart);
	if (failedReasonEnd < 0)
	{
		failedReasonStart = response.indexOf("<SOAP-ENV:Detail>") + 17;
		failedReasonEnd = response.indexOf("</SOAP-ENV:Detail>", failedReasonStart);
	}
	
	return xrxUnescape(response.substring(failedReasonStart, failedReasonEnd));
}

/**
* Function to escape the unescaped characters in a xml payload.
*
* @param text	string to modify
*/
function xrxEscape( text )
{
	text = xrxReplaceChars( text, "<", "&lt;");
	text = xrxReplaceChars( text, ">", "&gt;");
	text = xrxReplaceChars( text, "\"", "&quot;");
	return text;
}
