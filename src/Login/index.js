
import React, { Component } from 'react';
import { gapi } from 'gapi-script'
import './styles.css';

class Login extends Component {

    componentWillMount = () => {
        // this.handleClientLoad();
    }

    makeApiCall = () => {
        var params = {
            // The ID of the spreadsheet to retrieve data from.
            spreadsheetId: '',
            // The A1 notation of the values to retrieve.
            range: 'Sheet1',
        };
        var request = gapi.client.sheets.spreadsheets.values.get(params);
        request.then(function(response) {
            console.log(response.result);
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
    }

    initClient = () => {
        var API_KEY = '';  // TODO: Update placeholder with desired API key.
        var CLIENT_ID = '';  // TODO: Update placeholder with desired client ID.
        // We can authorize using one of the following scopes:
        /*
            'https://www.googleapis.com/auth/drive'
            'https://www.googleapis.com/auth/drive.file'
            'https://www.googleapis.com/auth/drive.readonly'
            'https://www.googleapis.com/auth/spreadsheets'
            'https://www.googleapis.com/auth/spreadsheets.readonly'
        */
        var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
        gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(function() {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
            this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    handleClientLoad = () => {
        gapi.load('client:auth2', this.initClient);
    }

    updateSignInStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.makeApiCall();
        }
    }

    handleSignInClick = (event) => {
        gapi.auth2.getAuthInstance().signIn();
    }

    handleSignOutClick = (event) => {
        gapi.auth2.getAuthInstance().signOut();
    }

    render() {
        return (
            <div className="centerContainer">
                <div/>
                <div className="homepageHeader">
                    <p>
                    WheelerLab Agglutination Data Annotator
                    </p>
                    <br/>
                    <div>
                        Welcome! Please sign in to begin annotating.
                    </div>
                    <br/>
                    {/* <form>
                        <label for="fname">Username: </label>
                        <input type="text" id="fname" name="fname"/><br/><br/>
                        <label for="lname">Password: </label>
                        <input type="text" id="lname" name="lname"/><br/><br/>
                        <input type="submit" value="Submit"/>
                    </form> */}
                    {/* <button >Sign in with Google</button> */}
                    <body>
                        {/* <button id="signin-button" onClick={this.handleSignInClick}>Sign in</button> */}
                        {/* <button id="signout-button" onClick={this.handleSignOutClick}>Sign out</button> */}
                    </body>
                </div>
                <div/>
            </div>
        );
    }
};

export default Login;
