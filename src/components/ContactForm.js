import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    // message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm('service_hjcejo4', 'template_3va62ht', form.current, 'QxLUMOBqRdQHr1sax')
      .then((result) => {
        console.log(result.text);
        alert('Message envoyé avec succès !');
        setFormData({ from_name: '', from_email: '', message: '' });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
        alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="formulaire">
    <form ref={form} onSubmit={sendEmail}>
      <input
        type="text"
        name="from_name"
        value={formData.user_name}
        onChange={handleChange}
        placeholder="Votre nom"
        required
      />
      <input
        type="email"
        name="to_email"
        value={formData.user_email}
        onChange={handleChange}
        placeholder="Votre email"
        required
      />
      {/* <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Votre message"
        required
      /> */}
      <button type="submit" className="button-form" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
    </div>
  );

}

export default ContactForm;
