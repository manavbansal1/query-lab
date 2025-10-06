'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Contact.css';

const Contact = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        subject: '', 
        message: ''
    });
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };  

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'bansalmanav39@gmail.com'
                },
                publicKey
            );

            setStatus('success');
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setStatus('');
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Email send failed:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="contact-modal-overlay" onClick={onClose}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                <h2>Get In Touch</h2>
                <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>
                {/* Form for the user to fill */}
                <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Name <span className="redStar">*</span></label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={status === 'sending'}/>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="redStar">*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={status === 'sending'} />
                    </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject <span className="redStar">*</span></label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required disabled={status === 'sending'}/>
                </div>
                <div className="form-group"><label htmlFor="message">Message <span className="redStar">*</span></label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required disabled={status === 'sending'} ></textarea>
                </div>
                <div className="form-actions">
                    {status === 'success' && (
                    <div className="status-message success"><CheckCircle size={20} />Message sent successfully!</div>
                    )}
                    
                    {status === 'error' && (
                    <div className="status-message error"><AlertCircle size={20} />Failed to send message. Please try again.</div>
                    )}
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <><div className="spinner"></div> Sending...</>
                    ) : (
                        <> <Send size={20} />Send Message</>
                    )}
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;