import React from "react";
import Map from "./GoogleMap";
import { geolocated } from "react-geolocated";

class MapWithLocation extends React.Component {
  render() {
    const position = this.props.coords
      ? {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude
        }
      : undefined;
    return (
      <>
        <Map {...this.props} position={position} />
        {!this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>
            <small>
              lat {this.props.coords.latitude}, lng{" "}
              {this.props.coords.longitude}
            </small>
          </div>
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
      </>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(MapWithLocation);