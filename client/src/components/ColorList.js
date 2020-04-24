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

  //updates the editted color in the API
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
      //colors.splice(index, 1, res.data)
      setEditing(false)

    })
    .catch(err => console.log(`Error: ${err}`))
  };
  
  //deletes the selected color in the API
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      updateColors(colors.filter(element => element.id != color.id))
    })
    .catch(err => console.log(`Error: ${err}`))
  };

  //handles form changes
  const handleChange = event => {
    setNewColor({ ...newColor, [event.target.name]: event.target.name ==='code'? {hex:`#${event.target.value}`}:  event.target.value.toLowerCase() })
};

//adds a new color to the API
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
    // color list
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
     {/* form to edit selected color */}
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
              placeholder={colorToEdit.color}
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
              placeholder={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* form here to add a color */}
      <form onSubmit={submitNewColor}>
        <h3>add a new color</h3>
        <label htmlFor='color'>
          color:
          <input type='text' name='color' placeholder="teal" onChange={handleChange} />
        </label>
        <label htmlFor='code'>
          hex Code:
          <input type='text' name='code' placeholder="ff11h2" onChange={handleChange} />
        </label>
        <input className="submit" type='submit' name='submit' />
      </form>
    </div>
  );
};

export default ColorList;
