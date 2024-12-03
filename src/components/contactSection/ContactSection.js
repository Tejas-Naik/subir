import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import SectionTitle from '../titles/SectionTitle';
import ParagraphText from '../paragraphTexts/ParagraphText';
import FormField from './FormField';
import PrimaryButton from '../buttons/PrimaryButton';

const ContactSectionStyles = styled(motion.div)`
  padding: 5rem 0;
  margin-top: var(--header-height);
  .contact__wrapper {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  .contact__info {
    margin-bottom: 4rem;
  }
  .contact__form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    .contact__field--fullWidth {
      grid-column: span 2;
    }
  }
  .contact__submit {
    width: 100%;
    font-size: 1.6rem;
  }
  .contact__error {
    color: var(--error);
    font-size: 1.4rem;
    margin-top: 0.5rem;
    text-align: left;
  }
  .contact__success {
    color: var(--success);
    background: var(--success-bg);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 2rem;
    text-align: center;
  }
  @media only screen and (max-width: 768px) {
    .contact__form {
      grid-template-columns: 1fr;
      .contact__field--fullWidth {
        grid-column: span 1;
      }
    }
  }
`;

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSectionStyles
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="contact__wrapper">
          <motion.div 
            className="contact__info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>Get In Touch</SectionTitle>
            <ParagraphText>We would love to hear from you.</ParagraphText>
            <ParagraphText className="contact__email">
              Email us directly at:{' '}
              <a href="mailto:contact@subirphotography.com">
                contact@subirphotography.com
              </a>
            </ParagraphText>
          </motion.div>
          <motion.form 
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FormField
              className="contact__field--fullWidth"
              type="text"
              label="Name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <FormField
              type="email"
              label="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <FormField
              type="text"
              label="Subject"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              required
            />
            <FormField
              className="contact__field--fullWidth"
              label="Message"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              rows="6"
              required
            />
            <motion.div 
              className="contact__field--fullWidth"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PrimaryButton
                type="submit"
                buttonType="button"
                className="contact__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </PrimaryButton>
            </motion.div>
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="contact__field--fullWidth contact__success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </ContactSectionStyles>
  );
}

export default ContactSection;
