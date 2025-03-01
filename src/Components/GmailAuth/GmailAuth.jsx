import { useEffect, useState } from "react";

// Google OAuth Client ID (Replace with your actual client ID)
const CLIENT_ID = '477869235774-oshemutotacda63j23g1o4em2a2b0ijr.apps.googleusercontent.com';

// OAuth Scopes: Determines the permissions requested from the user
const SCOPES = "https://www.googleapis.com/auth/gmail.send";

function GoogleAuth( { onLoginSuccess, render }) {
  // State to store the OAuth access token
  const [token, setToken] = useState(null); // not sure if we need this

  // State to store the Google OAuth Token Client
  const [tokenClient, setTokenClient] = useState(null);



  useEffect(() => {
    /**
     * Function to load the Google Identity Services (GIS) SDK dynamically.
     * This ensures that the `google` object is available before we use it.
     */
    const loadGoogleScript = () => {
      console.log('loading google script');
      return new Promise((resolve) => {
        // If `window.google` is already defined, the script is loaded, so resolve immediately
        if (window.google) {
          resolve(window.google);
          return;
        }

        // Otherwise, create a new script element to load Google Identity Services
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client"; // GIS SDK URL
        script.async = true;
        script.defer = true;
        
        // When the script is fully loaded, resolve the Promise with `window.google`
        script.onload = () => resolve(window.google);
        
        // Append the script to the document body so it starts loading
        document.body.appendChild(script);
      });
    };

    /**
     * Load the Google Identity Services SDK and initialize the Token Client.
     * This client will be used to request an OAuth 2.0 access token.
     */
    loadGoogleScript().then((google) => {
      if (google) {
        console.log('yo google');
        // Initialize the OAuth2 Token Client
        const client = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID, // Use your OAuth Client ID
          scope: SCOPES, // Define the access scopes needed
          callback: (response) => {
            // When the user grants access, store the token in state
            if (response.access_token) {
              setToken(response.access_token);
              onLoginSuccess(response.access_token); // callback function to parent Login, WITH THE ACCESS TOKEN
            }
          },
        });

        // Store the initialized token client in state for later use
        setTokenClient(client);

      }
    });
  }, []); // Empty dependency array ensures this runs only once on component mount

  /**
   * Function to initiate the Google OAuth 2.0 login process
   * Calls the token client to request an access token.
   */
  const handleLogin = () => {
    if (tokenClient) {
      console.log('requesting token');
      tokenClient.requestAccessToken(); // Opens the Google login popup
    } else {
      console.error("Google OAuth client is not initialized yet.");
    }
  };

  return (
    <div>
      {/* Button to trigger Google Sign-In */}
      { render({
        onClick: handleLogin,
        })
      }
    </div>
  );
}

export default GoogleAuth;
