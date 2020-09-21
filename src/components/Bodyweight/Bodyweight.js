/*global google*/
import React from "react";

class Bodyweight extends React.Component {
  componentDidMount() {
    const { origin, destination } = this.props;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result) => {
        if (result.routes.length === 0) {
          this.props.onRouteChange("impossible");
        } else
          this.props.distanceUpdater(
            result.routes[0].legs[0].distance.text,
            result.routes[0].overview_polyline
          );
      }
    );
  }

  render() {
    return (
      <div className="ma1 mt0" style={{ height: "auto", width: "auto" }}>
        <p className="f3">
          {"Optional: plug in your stats for extra accuracy."}
        </p>
        <div className="flex flex-column pa4 br3 shadow-5">
          <div className="form pa1 center ">
            <input
              type="number"
              onChange={(e) => this.props.onInputChange(e)}
              name="feet"
              className=""
              placeholder="Height - ft "
            />
          </div>
          <div className="form pa1 center ">
            <input
              type="number"
              onChange={(e) => this.props.onInputChange(e)}
              name="inches"
              className=""
              placeholder="Height - in"
            />
          </div>
          <div className="form pa1 center">
            <input
              type="number"
              onChange={(e) => this.props.onInputChange(e)}
              name="weight"
              className=""
              placeholder="Weight (lbs)"
            />
          </div>
          <div className="form pa1 center">
            <input
              type="number"
              onChange={(e) => this.props.onInputChange(e)}
              name="age"
              className=""
              placeholder="Age"
            />
          </div>
          <div className="mb2 pa2">
            <input
              type="radio"
              className="pointer f4"
              onClick={(e) => this.props.onInputChange(e)}
              id="male"
              name="gender"
              value="male"
            />
            <label htmlFor="male"> Male</label> <br />
            <input
              type="radio"
              className="pointer f4"
              onClick={(e) => this.props.onInputChange(e)}
              id="female"
              name="gender"
              value="female"
            />
            <label htmlFor="female"> Female</label> <br />
            <input
              type="radio"
              className="pointer f4 pa2 mb2"
              onClick={(e) => this.props.onInputChange(e)}
              id="non-binary"
              name="gender"
              value="non-binary"
            />
            <label htmlFor="non-binary"> Prefer not to say</label>
          </div>
          <div className="flex justify-between">
            <button
              className="w-40 grow pa2 f4 pointer ph3 pv2 dib white bg-light-purple"
              onClick={() => this.props.onButtonSubmit("nuggulator")}
            >
              {" "}
              Submit
            </button>
            <button
              className="w-40 grow pa2 f4 pointer ph3 pv2 dib white bg-gray"
              onClick={() => {
                this.props.onButtonSubmit("nuggulator");
                this.props.avgTruth();
              }}
            >
              {" "}
              No thanks, weirdo
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Bodyweight;
