import { useState, useEffect } from 'react';
import { Text } from "@radix-ui/themes";


const Loader: React.FC = () => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Text as="p" size="2" color='blue'>
        [{dots}]
      </Text>
    </div>
  );
};

export default Loader;
