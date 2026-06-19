import { connection } from './dbConnection';

export async function getBookingDetails() {
  const [contactRows]: any = await connection.query(
    `SELECT id, mobile_number, email_id
     FROM booking_contact_details
     LIMIT 1`
  );

  if (contactRows.length === 0) {
    throw new Error('No booking contact details found in database');
  }

  const contact = contactRows[0];

  const [passengerRows]: any = await connection.query(
    `SELECT name, age, gender
     FROM passengers
     WHERE booking_contact_id = ?`,
    [contact.id]
  );

  if (passengerRows.length === 0) {
    throw new Error('No passenger data found in database');
  }

  return {
    contactDetails: {
      mobileNumber: contact.mobile_number,
      emailId: contact.email_id,
    },
    passengers: passengerRows.map((p: any) => ({
      name: p.name,
      age: String(p.age),
      gender: p.gender,
    })),
  };
}