const communities = [
  { name: 'Movies', href: '#', current: true },
  { name: 'Food', href: '#', current: false },
  { name: 'Sports', href: '#', current: false },
  { name: 'Animals', href: '#', current: false },
  { name: 'Science', href: '#', current: false },
  { name: 'Dinosaurs', href: '#', current: false },
  { name: 'Talents', href: '#', current: false },
  { name: 'Gaming', href: '#', current: false },
];

const CategoryPicker = () => {
  return (
    <div className='px-4 sm:px-0'>
      <div className=''>
        <label htmlFor='question-tabs' className='sr-only'>
          Select a tab
        </label>
        <select
          id='question-tabs'
          className='block w-full text-base font-medium text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-rose-500 focus:ring-rose-500'
          // defaultValue={tabs.find(tab => tab.current).name}
        >
          <option>All</option>
          <option>Recent</option>
          <option>Trending</option>
          {communities.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryPicker;
