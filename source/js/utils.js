function isNumericInput (evt) {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
}

function isModifierKey (evt) {
  const key = evt.keyCode;
  return (evt.shiftKey === true || key === 35 || key === 36) || // Разрешить Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Разрешить Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Разрешить left, up, right, down
        (evt.ctrlKey === true || evt.metaKey === true) // Разрешить control, command
}

function isEscKeyPressed (evt) {
  return evt.key === 'Escape';
}

export {isNumericInput};
export {isModifierKey};
export {isEscKeyPressed};
