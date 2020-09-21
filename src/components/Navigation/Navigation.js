import React from "react";
const google = window.google;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInputOrigin = React.createRef(); // wat is this?
    this.autocompleteInputDestination = React.createRef();
    this.autocomplete = null;
    this.handleOriginChanged = this.handleOriginChanged.bind(this);
    this.handleDestinationChanged = this.handleDestinationChanged.bind(this);
  }

  componentDidMount() {
    // Initiates Google Autocomplete APIs
    this.autocompleteOrigin = new google.maps.places.Autocomplete(
      this.autocompleteInputOrigin.current
    );
    this.autocompleteOrigin.addListener(
      "place_changed",
      this.handleOriginChanged
    );

    this.autocompleteDestination = new google.maps.places.Autocomplete(
      this.autocompleteInputDestination.current
    );
    this.autocompleteDestination.addListener(
      "place_changed",
      this.handleDestinationChanged
    );
  }

  handleOriginChanged() {
    const place = this.autocompleteOrigin.getPlace();
    this.props.onOriginLoaded(place);
  }

  handleDestinationChanged() {
    const place = this.autocompleteDestination.getPlace();
    this.props.onDestinationLoaded(place);
  }

  render() {
    return (
      <div className="center" style={{ height: "auto", width: "90%" }}>
        <div style={{ height: "auto", width: "auto" }}>
          <h1>{"Tell me where you're walking."}</h1>
          <p className="f3">
            {"I'll tell you how many McNuggets you'll need."}
          </p>
        </div>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              ref={this.autocompleteInputOrigin}
              id="origin"
              placeholder="Origin"
              aria-label="origin"
              type="text"
              className="form pa1 center"
            ></input>

            <input
              ref={this.autocompleteInputDestination}
              id="destination"
              placeholder="Destination"
              aria-label="destination"
              type="text"
              className="form pa1 center"
            ></input>
          </div>
          <div>
            <button
              onClick={() => this.props.onMainSubmit("body")}
              className="w-30 grow f4 pointer ph3 pv2 
            dib white bg-light-purple"
            >
              {" "}
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
