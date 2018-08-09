import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class TurnNotification extends React.Component {
  constructor() {
    super();
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showNotifications() {
    // If the Notifications API is supported by the browser
    // then show the notification
    if(this.n.supported()) this.n.show();
  }

  handleClick(event) {
    // Do something here such as
    // console.log("Notification Clicked") OR
    // window.focus() OR
    // window.open("http://www.google.com")
    console.log('Notification clicked!');
    // Lastly, Close the notification
    this.n.close(event.target.tag);
  }

  render() {
    return (
      <div>
         <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Another Title" // Required
          body="Times out after 2 seconds"
          icon="devices-logo.png"
          tag="abcdef"
          timeout="2000"
          onClick={event => this.handleClick(event)}
        />

      </div>
    )
  };
};

export default TurnNotification;
