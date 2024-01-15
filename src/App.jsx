import './App.css'
import Button from './components/Button/Button'
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvidev, UserContext } from './context/user.context';
import { useContext, useState } from 'react';

function mapItems(items) {
	if (!items || !Array.isArray(items)) {
	  return [];
	}
	return items.map(i => ({
	  ...i,
	  date: new Date(i.date)
	}));
  }
  

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = item => {
		const updatedItems = mapItems(items) || []; 
		if (!item.id) {
			setItems([
				...updatedItems,
				{
				  ...item,
				  date: new Date(item.date),
				  id: updatedItems.length > 0 ? Math.max(...updatedItems.map(i => i.id)) + 1 : 1,
				}
			  ]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		} 
	  };

	  const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

  return (
	<UserContextProvidev>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} data={selectedItem} onDelete={deleteItem}/>
				</Body>
			</div>
	</UserContextProvidev>
  )
}

export default App
