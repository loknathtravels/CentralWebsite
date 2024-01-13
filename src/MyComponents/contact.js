import React, { useState } from 'react'
import '../CSS/contact.css'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'

const Contact = React.forwardRef((props, ref) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const SERVICE_ID = "service_xyhkjyu";
  const TEMPLATE_ID = "template_omf3s98";
  const PUBLIC_KEY = "zxm5q6G7RbwDZtM9z";

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  }

  return (
    <div ref={ref} className='container contact-form-container'>
      <h2>Contact Us</h2>
      <p>Send your querries and questions directly to us.</p>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name='user_email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="name">Your Name:</label>
        <input
          type="name"
          id="name"
          name='from_name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />


        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
});

export default Contact;
