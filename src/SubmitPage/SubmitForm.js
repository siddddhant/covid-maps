import React from "react";
import Map from "../Map";
import LocationSearchControl from "../LocationSearch";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import * as api from "../api";

function ButtonWithLoading(props) {
  return props.isLoading ? (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />{" "}
      Submitting...
    </Button>
  ) : (
    <Button {...props} />
  );
}

class SubmitForm extends React.Component {
  state = {
    isLoading: false,
    hasSubmitted: false
  };

  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const elements = event.target.elements;
    const data = {
      Name: elements.formBasicStore.value,
      Category: elements.formBasicServiceType.value,
      "Opening Time": elements.formBasicOpenTimings.value,
      "Closing Time": elements.formBasicCloseTimings.value,
      Notes: elements.formBasicComments.value,
      Timestamp: new Date().toISOString()
    };
    api.submit(data).then(response => {
      console.log(response);
      this.setState({ isLoading: false, hasSubmitted: true });
    });
  }

  render() {
    return (
      <Form className="my-3" onSubmit={e => this.onSubmit(e)}>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Location</Form.Label>
          <LocationSearchControl text={"text"} />
        </Form.Group>

        <Map width={"100%"} height={200} />

        <Form.Group controlId="formBasicStore">
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter store name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicServiceType">
          <Form.Label>Service Type</Form.Label>
          <Form.Control size="sm" as="select">
            <option>Kirana Store</option>
            <option>Supermarket</option>
            <option>Restaurant</option>
            <option>ATM</option>
            <option>Clinic</option>
            <option>Pharmacy</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicOpenTimings">
              <Form.Label>Opening Time</Form.Label>
              <Form.Control
                size="sm"
                type="time"
                step="60"
                placeholder="Open time"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCloseTimings">
              <Form.Label>Closing Time</Form.Label>
              <Form.Control size="sm" type="time" placeholder="Closing time" />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="formBasicCrowdDetails">
          <Form.Label>Safety</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Queues at store and Covid-19 precautions"
          />
        </Form.Group>

        <Form.Group controlId="formBasicComments">
          <Form.Label>Useful Information</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Contact no./Stock availability/delivery options"
          />
        </Form.Group>

        {this.state.hasSubmitted ? (
          <Alert variant="success">Submitted!</Alert>
        ) : null}

        <ButtonWithLoading
          isLoading={this.state.isLoading}
          variant="primary"
          type="submit"
        >
          Submit
        </ButtonWithLoading>
      </Form>
    );
  }
}

export default SubmitForm;
