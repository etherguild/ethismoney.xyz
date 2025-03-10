import React, { useState, useEffect, useMemo, useRef } from 'react';

const ParagraphNewsletterSignup = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const progressRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Constants for animation
  const ANIMATION_DURATION = 2000; // 2 seconds

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  // Your publication slug - replace with your actual publication slug
  const PUBLICATION_SLUG = 'test-publication-02837';

  // Animation function for smooth progress
  const animateProgress = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      return requestAnimationFrame(animateProgress);
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    if (progressRef.current) {
      progressRef.current.style.transform = `translateX(${-progress * 100}%)`;
    }

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateProgress);
    } else {
      // Animation complete, reset form
      setTimeout(() => {
        setStatus('');
        setEmail('');
        startTimeRef.current = null;
      }, 500);
    }
  };

  // Handle animation when status changes to success
  useEffect(() => {
    if (status === 'success') {
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Start a new animation
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animateProgress);
    }

    // Cleanup animation on unmount or status change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setStatus('');

    // Validate email before submission
    if (!email.trim()) {
      setValidationError('Please enter your email address');
      return;
    }

    if (!validateEmail(email.trim())) {
      setValidationError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // This is the direct subscription endpoint that actually works
      const response = await fetch(`https://api.paragraph.xyz/blogs/@${PUBLICATION_SLUG}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://paragraph.xyz', // Important for CORS
          'Referer': 'https://paragraph.xyz/' // Also important for request validation
        },
        body: JSON.stringify({
          email: email,
          skipWelcomeEmail: false // Set to true if you don't want Paragraph to send a welcome email
        })
      });

      const data = await response.json();

      // We'll also track the analytics event, but this isn't critical for the subscription
      // This is just to match Paragraph's normal behavior
      trackSubscriptionEvent(email);

      if (response.ok) {
        setStatus('success');
        // Don't clear the email immediately - it will be cleared after the animation
      } else {
        console.error('Error subscribing:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Optional analytics tracking to match Paragraph's implementation
  const trackSubscriptionEvent = async (email) => {
    try {
      const deviceId = localStorage.getItem('paragraph_device_id') ||
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      localStorage.setItem('paragraph_device_id', deviceId);

      const sessionId = Date.now();

      const analyticsData = {
        api_key: '5b9bf00b987cbea59d468256dfa811bc',
        events: [
          {
            device_id: deviceId,
            session_id: sessionId,
            time: Date.now(),
            platform: 'Web',
            language: navigator.language || 'en-US',
            ip: '$remote',
            insert_id: Math.random().toString(36).substring(2, 15),
            event_type: 'subscribe_modal_email_submitted',
            event_properties: {
              blogId: 'RYty4pJCB5T8SR2SSOQt', // This should be the numerical ID, not the slug
              email: email
            },
            user_agent: navigator.userAgent
          }
        ]
      };

      fetch('https://api.paragraph.xyz/amp2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://paragraph.xyz',
          'Referer': 'https://paragraph.xyz/'
        },
        body: JSON.stringify(analyticsData)
      }).catch(error => {
        // We can safely ignore analytics errors
        console.log('Analytics tracking error (non-critical):', error);
      });
    } catch (error) {
      // Non-critical, so just log the error
      console.log('Analytics tracking error (non-critical):', error);
    }
  };

  // Calculate remaining time for the message
  const remainingTimeText = useMemo(() => {
    if (status !== 'success' || !startTimeRef.current) return "";

    const elapsed = performance.now() - startTimeRef.current;
    const remaining = Math.ceil((ANIMATION_DURATION - elapsed) / 1000);
    return `Form will reset in ${remaining > 0 ? remaining : 0} second${remaining !== 1 ? 's' : ''}`;
  }, [status, startTimeRef.current]);

  return (
    <div className="w-full max-w-[450px] flex flex-col gap-[10px]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[10px] items-center">
        {/* Email input field styled like the old design */}
        <div className={`w-full h-[74px] px-[50px] py-[25px] bg-[#FEFEFE] rounded-full border-[3px] 
          ${validationError ? 'border-[#FF4D4F]' : status === 'success' ? 'border-[#C3E0EB]' : 'border-[#1B3555]'} 
          flex justify-center items-center transition-all duration-300`}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) {
                setValidationError('');
              }
            }}
            onBlur={() => {
              if (email.trim() && !validateEmail(email.trim())) {
                setValidationError('Please enter a valid email address');
              }
            }}
            placeholder="vitalik@ethismoney.xyz"
            className="text-center w-full bg-transparent outline-none text-[#1B3555] text-[18px] font-semibold font-manrope placeholder:text-[#B0B7C3]"
            aria-invalid={!!validationError}
            disabled={loading || status === 'success'}
          />
        </div>

        {/* Validation error message */}
        {validationError && (
          <div className="text-[#FF4D4F] text-[14px] font-medium font-manrope pl-[15px]">
            {validationError}
          </div>
        )}

        {/* Submit button with animated progress bar */}
        <button
          type="submit"
          disabled={loading || status === 'success'}
          className={`w-fit z-[0] px-[25px] py-[10px] rounded-full flex justify-center items-center transition-colors duration-200 
            ${loading ? 'bg-[#D9EEF4]' : 'bg-[#B7DDE8]'} 
            ${loading || status === 'success' ? 'cursor-default' : 'cursor-pointer hover:bg-[#A3CAD6]'} 
            relative overflow-hidden`}
        >
          {status === 'success' && (
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-[#C3E0EB] z-[5]"
              style={{ width: '100%', transform: 'translateX(0%)' }}
            />
          )}
          <div className="headline-md z-10 relative">
            {loading ? 'Submitting...' :
              status === 'success' ? 'Subscribed successfully!' :
                'Send Me the Latest'}
          </div>
        </button>

        {/* Status messages - for both success and error states */}
        <div className={`overflow-hidden transition-all duration-300 ${status || validationError ? 'max-h-[50px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {status === 'success' && (
            <div className="text-center text-[#2A6F97] text-[14px] font-semibold font-manrope">
              Thanks for subscribing! {remainingTimeText}
            </div>
          )}

          {status === 'error' && (
            <div className="text-center text-[#FF4D4F] text-[14px] font-semibold font-manrope">
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ParagraphNewsletterSignup;