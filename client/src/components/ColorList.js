import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth.js';



const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);  
  const [newColor, setNewColor] = useState({
    color:'',
    code: {hex: '#'},
    id: colors.length+1

  });
  const [errors, setErrors] = useState({
    colors: "",
    code: ""
})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      var newColors = Object.assign(colors)
      var index = colorToEdit.id-1;
      newColors.splice(index, 1, res.data)
      updateColors(newColors)
      setEditing(false)

    })
    .catch(err => console.log(`Error: ${err}`))
  };
  

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      updateColors(colors.filter(element => element.id != color.id))
    })
    .catch(err => console.log(`Error: ${err}`))
  };

  const handleChange = event => {
    setNewColor({ ...newColor, [event.target.name]: event.target.name ==='code'? {hex:`#${event.target.value}`}:  event.target.value.toLowerCase() })
};

const submitNewColor = event =>{
  event.preventDefault();
  axiosWithAuth()
  .post('/api/colors', newColor)
  .then(res => { 
    updateColors(res.data)
  })
  .catch(err => console.log(`Error: ${err}`))
}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
      {colors.map(color => (
      <li key={color.id} onClick={() => editColor(color)}>
        <span>
          <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
            }>
              x
          </span>{" "}
          {color.color}
        </span>
        <div
          className="color-box"
          style={{ backgroundColor: color.code.hex }}
        />
      </li>
     ))}
      </ul>
      {editing && (
        <form id="colorForm" onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={submitNewColor}>
        <h3>Add a new color</h3>
        <label htmlFor='color'>
          Color:
          <input type='text' name='color' onChange={handleChange} />
        </label>
        <label htmlFor='code'>
          Hex Code:
          <input type='text' name='code' onChange={handleChange} />
        </label>
        <input className="submit" type='submit' name='submit' />
      </form>
    </div>
  );
};

export default ColorList;
