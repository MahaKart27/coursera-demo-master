import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};

    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentOption, setPaymentOption] = useState('full');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!course) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [course]);

    const handlePayment = () => {
        if (paymentAmount <= 0) {
            alert('Please enter a valid payment amount.');
            return;
        }

        const paymentStatus = paymentOption === 'full' ? 'paid' : 'emi';
        const username = sessionStorage.getItem('username');
        const userEmail = sessionStorage.getItem('email');
        
        if (!username || !userEmail) {
            alert('User information not found. Please login again.');
            navigate('/login');
            return;
        }

        if (!course || !course.id) {
            alert('Course information not found. Please select a course.');
            return;
        }

        fetch(`http://localhost:5000/api/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                courseId: course.id,
                paymentAmount: paymentAmount,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === "Payment processed successfully") {
                fetch(`http://localhost:5000/api/enrollments/${username}/${course.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'approved', paymentStatus: paymentStatus, userEmail: userEmail }),
                })
                .then(response => response.json())
                .then(enrollmentData => {
                    console.log(enrollmentData);
                    if (enrollmentData.message === "Enrollment status updated") {
                        alert('Payment and enrollment successful!');
                        navigate('/admin');
                    } else {
                        alert('Payment successful, but enrollment failed!');
                    }
                })
                .catch(error => {
                    console.error('Error updating enrollment status:', error);
                    alert('Error updating enrollment status');
                });
            } else {
                alert('Payment failed!');
            }
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            alert('Error processing payment');
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Payment for {course ? course.name : 'Course Name'}</h1>
            <div>
                <label>
                    Payment Amount:
                    <input 
                        type="number" 
                        value={paymentAmount} 
                        onChange={(e) => setPaymentAmount(e.target.value)} 
                    />
                </label>
            </div>
            <div>
                <label>
                    Payment Option:
                    <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
                        <option value="full">Full Fee</option>
                        <option value="emi">EMI</option>
                    </select>
                </label>
            </div>
            <button onClick={handlePayment}>Make Payment</button>
        </div>
    );
}

export default PaymentPage;
