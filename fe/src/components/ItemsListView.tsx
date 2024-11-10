// index.jsx
import * as Collapsible from '@radix-ui/react-collapsible';
import '../App.css';

import { Box, Text, Card } from '@radix-ui/themes';
import { Items, Item } from '../types';

const ItemCard = ({ item }: { item: Item }) => {
	const RowSet = ({left, right}: {left: string, right?: string | null}) => (
		<>
			<Text as="div" size="2" weight="bold">{left}</Text>
			{right ? <Text as="div" size="2">{right}</Text> : null}
		</>
	);

	const installationDate = item.installationDate ? item.installationDate.toDateString() : null;
	return (
		<Box key={item.uid}>
			<Card style={{width: '30vw'}}>
				<RowSet key={item.uid+'1'} left={item.name}/>
				<RowSet key={item.uid+'2'} left={item.serialNumber} right={installationDate}/>
			</Card>
		</Box>
	)
}

export default ({ items }: { items: Items }) => {
	const CategorySection = (category: keyof Items) => (
		<Collapsible.Root
			key={category}
			defaultOpen={true}
			style={{ alignItems: 'flex-start', display: 'flex', paddingLeft: '2vw', flexDirection: 'column' }}
		>
			<Collapsible.Trigger style={{ width: '30vw', alignItems: 'flex-start', color: 'rbg(105,115,00)', backgroundColor: 'blue' }}>
				<Text size='2' weight='bold'>
					{category}
				</Text>
			</Collapsible.Trigger>
			<Collapsible.Content className='CollapsibleContent'>
				{items[category].map((item) => (
					<ItemCard key={item.uid} item={item} />
				))}
			</Collapsible.Content>
		</Collapsible.Root>
	);
	return <div style={{ overflow: 'hidden', height: '100vh', paddingTop: '3vh' }}>{Object.keys(items).map((category) => CategorySection(category as keyof Items))}</div>;
};
