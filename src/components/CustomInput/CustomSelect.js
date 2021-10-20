import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('')
  const { formControlProps, itens, name, id, onChange } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl {...formControlProps} className={formControlProps.className + " " + classes.formControl}>
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Select
            labelId={id}
            id={id}
            value={value}
            onChange={handleChange}>
        <MenuItem value=""> Todos </MenuItem>
        {itens.map((prop, key) => { return (<MenuItem value={prop.id}> {prop.value} </MenuItem>); })}
        </Select>
    </FormControl>
  );
}

//
        