import React, { useState } from 'react';

const AddRecipie = () => {
  const [recipieName, setRecipieName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');

  const handleRecipieNameChange = (e) => {
    setRecipieName(e.target.value);
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the recipie
  };

  return (
    <div>
      <h2>Add New Recipie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipie Name:
          <input type="text" value={recipieName} onChange={handleRecipieNameChange} />
        </label>
        <br />
        <label>
          Ingredients:
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </label>
        <br />
        <label>
          Instructions:
          <textarea value={instructions} onChange={handleInstructionsChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRecipie;
