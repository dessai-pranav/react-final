import styled from "styled-components";
import { useBooking } from "./useBooking.jsx";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useNavigate } from "react-router-dom";
import Row from "../../ui/Row.jsx";
import Heading from "../../ui/Heading.jsx";
import Tag from "../../ui/Tag.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Spinner from "../../ui/Spinner.jsx";
import BookingDataBox from "./BookingDataBox.jsx";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (error) {
    console.error("Error loading booking:", error);
    return <Empty resource="booking" />;
  }

  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
      <>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading type="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Button>
          )}

          {status === "checked-in" && (
              <Button
                  onClick={() =>
                      console.log("Checkout functionality to be implemented")
                  }
              >
                Check out
              </Button>
          )}

          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">Delete booking</Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                  resource="booking"
                  onConfirm={() =>
                      console.log("Delete functionality to be implemented")
                  }
                  disabled={false}
              />
            </Modal.Window>
          </Modal>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </>
  );
}

export default BookingDetail;