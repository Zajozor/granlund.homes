import logoSrc from '../assets/granlund-logo.png';

const ResponsiveNavbar = () => (
  <div style={{ display: 'flex', height: 69, color: '#fff', alignItems: 'center', paddingLeft: 42, borderRadius: 20 }}>
    <a href='/'>
      <img src={logoSrc} alt='Granlund logo' width={100} height={40} />
    </a>
  </div>
);

export default ResponsiveNavbar;
