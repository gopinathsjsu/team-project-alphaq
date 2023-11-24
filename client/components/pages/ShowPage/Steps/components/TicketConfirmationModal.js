import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function TicketConfirmationModal({ ...props }) {
  return (
    <SweetAlert
      customClass="text-black"
      success
      confirmBtnText="Go to Home"
      confirmBtnBsStyle="success"
      confirmBtnCssClass="text-base rounded bg-green-500 p-2"
      confirmBtnStyle={{ color: 'white' }}
      title="Ticket Booked Successfully"
      closeAnim={{ name: 'hideSweetAlert', duration: 300 }}
      {...props}
    >
      Be ready for the show!
    </SweetAlert>
  );
}
