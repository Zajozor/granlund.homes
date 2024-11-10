import { Button, Box, Text } from '@radix-ui/themes';
import { Property } from '../types';
import '../App.css';

const PropertyListItem = ({ property }: { property: Property }) => {
  const { address, id, floors } = property;
  const isPropertiesAdded = address !== undefined;
  const text = isPropertiesAdded ? address : 'No properties added';
  const openProperty = () => window.location.href = `/properties/${id}`;

  const ActionsButtons = () => (
    <Box>
      <Button size="2" variant="soft" onClick={openProperty}>
        Open
      </Button>
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
