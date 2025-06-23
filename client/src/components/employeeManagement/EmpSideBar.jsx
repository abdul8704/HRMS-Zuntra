import { useState, useEffect } from "react";
import { Users, Mail, Phone, DollarSign, Edit3, Menu, X } from "lucide-react";
import ZuntraLogo from "../../assets/Zuntra.svg"

export default function ProfileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyles = {
    width: isMobile ? '100%' : '320px',
    minHeight: '100vh',
    backgroundColor: '#BBD3CC',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: isMobile ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    zIndex: isMobile ? 1000 : 'auto',
    transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
    transition: isMobile ? 'transform 0.3s ease-in-out' : 'none'
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: isMobile && isOpen ? 'block' : 'none',
    transition: 'opacity 0.3s ease-in-out'
  };

  const textStyles = {
    color: '#000000',
    opacity: 0.5
  };

  const nameStyles = {
    color: '#000000',
    opacity: 1
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div style={overlayStyles} onClick={toggleSidebar}></div>
      
      {/* Sidebar */}
      <div style={sidebarStyles}>
        {/* Hamburger Menu Icon - Only on Mobile */}
        {isMobile && (
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
            <button 
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={toggleSidebar}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {isOpen ? (
                <X className="w-6 h-6" style={textStyles} />
              ) : (
                <Menu className="w-6 h-6" style={textStyles} />
              )}
            </button>
          </div>
        )}

        {/* Logo */}
        <div style={{ paddingTop: isMobile ? '64px' : '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={ZuntraLogo}
              alt="ZUNTRA DIGITAL Logo"
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '32px' }}>
          {/* Profile Image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{
              width: isMobile ? '140px' : '160px',
              height: isMobile ? '140px' : '160px',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#d1d5db'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
  <h2 style={{ 
    ...nameStyles, 
    fontSize: isMobile ? '20px' : '24px', 
    fontWeight: '400', // Changed to regular
    marginBottom: '4px' 
  }}>
    Dharanish
  </h2>
  <p style={textStyles}>UI/UX Designer</p>
</div>

          {/* Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...textStyles }}>
              <Users style={{ width: '20px', height: '20px' }} />
              <span>Team 1</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...textStyles }}>
              <Mail style={{ width: '20px', height: '20px' }} />
              <span style={{ fontSize: isMobile ? '12px' : '14px', wordBreak: 'break-all' }}>
                edwin.zuntra@gmail.com
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...textStyles }}>
              <Phone style={{ width: '20px', height: '20px' }} />
              <span>9876543210</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...textStyles }}>
              <DollarSign style={{ width: '20px', height: '20px' }} />
              <span>50,000 per month</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          <button style={{
            width: '100%',
            backgroundColor: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            ...textStyles
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}>
            <Edit3 style={{ width: '16px', height: '16px' }} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Toggle button when sidebar is closed (for mobile only) */}
      {!isOpen && isMobile && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1001
        }}>
          <button 
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#BBD3CC',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={toggleSidebar}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#a8c4bc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#BBD3CC'}
          >
            <Menu className="w-6 h-6" style={textStyles} />
          </button>
        </div>
      )}
    </>
  );
}