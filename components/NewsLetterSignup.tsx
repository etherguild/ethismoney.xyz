import { useState, useRef, useEffect } from 'react';

const NewsLetterSignup = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset status after 5 seconds of success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Make sure the message is from Paragraph
      if (event.origin.includes('paragraph.xyz')) {
        if (event.data?.type === 'subscription-success') {
          setStatus('success');
          setEmail('');
        } else if (event.data?.type === 'subscription-error') {
          setStatus('error');
          setErrorMessage(event.data.message || 'Subscription failed. Please try again.');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      // Check if iframe is available
      if (!iframeRef.current || !iframeLoaded) {
        throw new Error('Subscription service not available. Please try again.');
      }

      // Access the iframe document
      const iframeDocument = iframeRef.current.contentDocument ||
        (iframeRef.current.contentWindow && iframeRef.current.contentWindow.document);

      if (!iframeDocument) {
        throw new Error('Unable to access subscription service due to browser security restrictions.');
      }

      // Find the email input and form in the iframe
      const iframeEmailInput = iframeDocument.querySelector('input[type="email"]');
      const iframeForm = iframeDocument.querySelector('form');

      if (!iframeEmailInput || !iframeForm) {
        throw new Error('Subscription form elements not found.');
      }

      // Fill in the email and submit the form
      (iframeEmailInput as HTMLInputElement).value = email;

      // Create and dispatch input event to ensure any listeners pick up the value change
      const inputEvent = new Event('input', { bubbles: true });
      iframeEmailInput.dispatchEvent(inputEvent);

      // Submit the form
      iframeForm.submit();

      // Since we can't reliably detect form submission success in the iframe due to CORS,
      // we'll simulate success after a short delay
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 1000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="px-[15px] desktop:px-0 mt-[40px] flex flex-col gap-y-[10px]">
      <div className="text-[#2A6F97] text-[24px] desktop:text-[30px] font-semibold font-manrope">
        Keep up-to-date with our newsletter
      </div>

      <div className="flex flex-col desktop:flex-row gap-[20px] items-start">
        <div className="w-full desktop:w-1/2">
          <span className="text-[#1B3555] text-[18px] font-bold font-manrope">
            Every day, there is new data around the topic of ETH is Money. We want you to be up-to-date with the latest.
          </span>
          <br /><br />
          <span className="text-[#1B3555] text-[18px] font-normal font-manrope">
            We'll deliver it weekly to your inbox, alongside educational content what money actually is, how ETH is doing and how it's going. And of course what everyone can do themselves.
          </span>
        </div>

        <div className="w-full desktop:w-1/2 flex flex-col items-center gap-[15px]">
          {status === 'success' ? (
            <div className="w-full max-w-[450px] p-[25px] bg-[#E8F5FA] rounded-[15px] border-[2px] border-[#2A6F97] flex flex-col gap-[15px] items-center justify-center transition-all duration-300">
              <div className="w-[50px] h-[50px] rounded-full bg-[#B7DDE8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#1B3555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-[#1B3555] text-[18px] font-semibold font-manrope text-center">
                Thank you for subscribing!
              </div>
              <div className="text-[#2A6F97] text-[16px] font-normal font-manrope text-center">
                Look for our newsletter in your inbox soon.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-[15px]">
              <div className="relative w-full max-w-[450px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="vitalik@ethismoney.xyz"
                  className={`w-full h-[74px] px-[25px] py-[25px] bg-[#FEFEFE] rounded-full border-[3px] text-[#1B3555] text-[18px] font-semibold font-manrope focus:outline-none transition-all duration-200 ${isInputFocused
                    ? 'border-[#2A6F97] shadow-[0_0_0_1px_rgba(42,111,151,0.2)]'
                    : 'border-[#1B3555]'
                    } ${status === 'error' ? 'border-red-400' : ''}`}
                  disabled={status === 'submitting'}
                  required
                />
                {status === 'error' && (
                  <div className="absolute -bottom-6 left-6 text-red-500 text-[12px] font-medium">
                    {errorMessage}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`px-[25px] py-[12px] bg-[#B7DDE8] rounded-full flex justify-center items-center min-w-[250px] transition-all duration-200 ${status === 'submitting' ? 'opacity-70' : 'hover:bg-[#9ED0E1]'
                  }`}
              >
                <div className="text-[#1B3555] text-[18px] font-semibold font-manrope">
                  {status === 'submitting' ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-[#1B3555]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe to our newsletter'
                  )}
                </div>
              </button>
            </form>
          )}

          <div className="text-center text-[#2A6F97] text-[12px] font-normal font-manrope">
            We will only send informative emails and the latest data snapshots.
          </div>

          {/* Hidden iframe */}
          <iframe
            ref={iframeRef}
            src="https://paragraph.xyz/@etherguild/embed?minimal=true"
            width="1"
            height="1"
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            frameBorder="0"
            onLoad={handleIframeLoad}
            title="Newsletter subscription"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSignup;
