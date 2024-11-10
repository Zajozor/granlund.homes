import logoSrc from '../assets/granlund-logo.png';
import * as Popover from "@radix-ui/react-popover";
import { Button, Text } from '@radix-ui/themes';
import qr from '../assets/qr.svg';

const ResponsiveNavbar = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', height: 69, alignItems: 'center', paddingRight: 42, paddingLeft: 42, borderRadius: 20, opacity: 0.6}}>
    <a href='/'>
      <img src={logoSrc} alt='Granlund logo' width={100} height={40} />
    </a>
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Add a member</Button>
      </Popover.Trigger>
      <Popover.Content>
        <img 
          src={qr}
          alt="qr code" 
          width={300} 
          height={300} 
        />
      </Popover.Content>
    </Popover.Root>
  </div>
);

export default ResponsiveNavbar;
