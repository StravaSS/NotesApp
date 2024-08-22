import React, { useState } from 'react';

const COLORS = [
  'bg-yellow-200', 'bg-blue-200', 'bg-green-200', 
  'bg-red-200', 'bg-purple-200', 'bg-pink-200'
];

const CategoryList = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState(COLORS[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, { name: newCategory.trim(), color: newCategoryColor }]);
      setNewCategory('');
      setNewCategoryColor(COLORS[0]);
      setIsAdding(false);
    }
  };

  const handleEditCategory = (index) => {
    setEditingIndex(index);
    setNewCategory(categories[index].name);
    setNewCategoryColor(categories[index].color);
  };

  const handleUpdateCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = { name: newCategory.trim(), color: newCategoryColor };
      setCategories(updatedCategories);
      setNewCategory('');
      setNewCategoryColor(COLORS[0]);
      setEditingIndex(null);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold mb-2">Categories</h2>
      <ul className="text-sm">
        {categories.map((category, index) => (
          <li key={index} className="mb-1 flex items-center justify-between">
            <div className="flex items-center flex-grow overflow-hidden">
              <span className={`w-3 h-3 flex-shrink-0 rounded-full mr-2 ${category.color}`}></span>
              <span className="truncate">{category.name}</span>
            </div>
            <div className="flex-shrink-0 ml-2">
              <button onClick={() => handleEditCategory(index)} className="text-xs mr-1">✏️</button>
              <button onClick={() => handleDeleteCategory(index)} className="text-xs">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      {(isAdding || editingIndex !== null) && (
        <div className="mt-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-1 text-black rounded mb-2"
            placeholder="Category name"
          />
          <div className="flex space-x-1 mb-2">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full ${color} ${newCategoryColor === color ? 'ring-2 ring-white' : ''}`}
                onClick={() => setNewCategoryColor(color)}
              ></button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={editingIndex !== null ? handleUpdateCategory : handleAddCategory}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              {editingIndex !== null ? 'Update' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingIndex(null);
                setNewCategory('');
                setNewCategoryColor(COLORS[0]);
              }}
              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {!isAdding && editingIndex === null && (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-2 bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          Add Category
        </button>
      )}
    </div>
  );
};

const NoteApp = () => {
  const [categories, setCategories] = useState([
    { name: 'YouTube Video Notes', color: 'bg-yellow-200' },
    { name: 'Tutorial / Class Notes', color: 'bg-blue-200' },
    { name: 'Scripts', color: 'bg-green-200' },
    { name: 'Research', color: 'bg-red-200' },
    { name: 'Other Good Content', color: 'bg-purple-200' },
    { name: 'Ideas', color: 'bg-pink-200' },
    { name: 'Personal Journal', color: 'bg-yellow-200' }
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: 'Move AI Looks Sick', content: 'This is such a cool app. Here\'s a comprehensive overview of Move AI and how you can use it as a content creator...', category: 'Ideas' },
    { id: 2, title: 'The mobile version needs work!', content: 'The mobile version has a lot of issues but that is okay for now. We are still working on it. We won\'t stop ever. This...', category: 'Research' },
    { id: 3, title: 'Finish Notes on Cubby YouTube Video', content: 'Cubby: A tool for creating searchable transcripts of video content, allowing users to highlight, tag, and download...', category: 'YouTube Video Notes' }
  ]);

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-200';
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 text-white p-3 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">My Library</h1>
        
        {/* Categories */}
        <CategoryList categories={categories} setCategories={setCategories} />
        
        {/* Upcoming Due Dates */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-2">Upcoming Due Dates</h2>
          <ul className="text-xs">
            <li className="mb-1">08/01: Finish Notes on Cubby YouTube Video</li>
            <li className="mb-1">07/23: Tell everyone I know about this</li>
            <li className="mb-1">07/19: Finish - How to code like a boss</li>
          </ul>
        </div>
        
        {/* Tags */}
        <div>
          <h2 className="text-base font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap">
            <span className="bg-blue-500 text-white px-2 py-1 rounded mr-1 mb-1 text-xs">#motioncapture</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded mr-1 mb-1 text-xs">#learning</span>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-1 mb-1 text-xs">#AITools</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded mr-1 mb-1 text-xs">#Fun</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notes</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">New Note</button>
        </div>
        
        {/* Notes Grid */}
        <div className="grid grid-cols-3 gap-4">
          {notes.map(note => (
            <div key={note.id} className={`${getCategoryColor(note.category)} p-4 rounded shadow relative`}>
              <h3 className="text-lg font-semibold mb-2 truncate">{note.title}</h3>
              <p className="text-sm mb-2">{note.content}</p>
              <span className="text-xs text-gray-600">{note.category}</span>
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute bottom-2 right-2 text-xs text-gray-500 hover:text-red-500"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
