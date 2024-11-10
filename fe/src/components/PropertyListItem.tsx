import { Button, Box, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom'; // For navigation to edit/view pages
import { Property } from '../types';
import '../App.css';

const PropertyListItem = ({ property }: { property: Property }) => {
  const { address, id, floors } = property;
  const isPropertiesAdded = address !== undefined;
  const text = isPropertiesAdded ? address : 'No properties added';

  const ActionsButtons = () => (
    <Box>
      <Link to={`/properties/${id}`}>
        <Button size="2" variant="soft">
          Open
        </Button>
      </Link>
    </Box>
  );

  return (
    <div className='listItem' style={{borderBottom: '1px solid #555'}} key={property.id}>
      <Box>
        <Text as="p" size="2">
          {text} ({floors} floor{floors !== 1 ? 's': ''})
        </Text>
      </Box>
      {isPropertiesAdded ? <ActionsButtons /> : null}
    </div>
  );
};

export default PropertyListItem;
