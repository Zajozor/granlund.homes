// index.jsx
import * as Collapsible from '@radix-ui/react-collapsible';
import '../App.css';

import { Box, Text, Card } from '@radix-ui/themes';
import { Items } from '../types';

const sectionColors: { [key in keyof Items]: string } = {
	electric: '#FFD700',
	hvac: '#FF8C00',
	plumbing: '#1E90FF',
	utilities: '#f6f6f6',
	structural: '#636363',
	appliances: '#FF1493',
	landscaping: '#228B22',
	security: '#DC143C',
	other: '#A9A9A9',
};

export default ({ items }: { items: Items }) => {
	const CategorySection = (category: keyof Items) => (
		<Collapsible.Root style={{ alignItems: 'flex-start', display: 'flex', paddingLeft: '2vw', flexDirection: 'column'}}>
			<Collapsible.Trigger style={{ width: '25vw', alignItems: 'flex-start'}}>
				<Text size='2' weight='bold' style={{ color: sectionColors[category]}}>
					{category}
				</Text>
			</Collapsible.Trigger>
			<Collapsible.Content className='CollapsibleContent'>
				{items[category].map((item) => (
					<Box key={item.uid}>
						<Text size='2'>
							{item.name}
						</Text>
					</Box>
				))}
			</Collapsible.Content>
		</Collapsible.Root>
	);
	return <>{Object.keys(items).map((category) => CategorySection(category as keyof Items))}</>;
};
