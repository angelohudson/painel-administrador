import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Tasks from "components/Tasks/Tasks.js";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [tableDataView, setTableDataView] = React.useState([]);
  const {
    idColumn,
    tableLink,
    tableHead, tableHeaderColor,
    tableData,
    tableSelectable, tableCheckedIndex, tableSetCheckedIndex
  } = props;
  let { tableActions } = props;

  if (tableActions == undefined)
    tableActions = [];

  function filter(event) {
    let value = event.target.value;
    let newTable = tableData.filter((item) => {
      let result = false;
      for (let index = 0; index < tableHead.length; index++) {
        if (item[tableHead[index]] && !result)
          result = (item[tableHead[index]] + "").includes(value);
      }
      return result;
    });
    setTableDataView(newTable);
    setInputValue(value);
  }

  React.useEffect(() => {
    setTableDataView(props.tableData);
  }, [props.tableData])

  return (
    <div className={classes.tableResponsive}>
      <CustomInput
        labelText="Buscar"
        id="search"
        formControlProps={{
          fullWidth: false,
        }}
        inputProps={{
          type: "text",
          onChange: filter,
          value: inputValue
        }}
      />
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              {tableSelectable ? <TableCell className={classes.tableCell + " " + classes.tableHeadCell}> selecione </TableCell> : null}
              {tableActions.map((prop, key) => { return <TableCell className={classes.tableCell + " " + classes.tableHeadCell}> {prop.buttonText} </TableCell> })}
            </TableRow>
          </TableHead>
        ) : null}
        {
          <TableBody>
            {
              tableDataView.map((prop, key) => {
                const obj = prop;
                return (
                  <TableRow key={key} className={classes.tableBodyRow}>
                    {tableHead.map((prop, key) => {
                      const head = prop;
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {obj[head]}
                        </TableCell>
                      );
                    })}
                    {tableSelectable ?
                      <TableCell className={classes.tableCell}>
                        <Tasks
                          checkedIndexes={tableCheckedIndex}
                          tableSetCheckedIndex={tableSetCheckedIndex}
                          tasksIndexes={[obj.id]}
                          tasks={[""]}
                        />
                      </TableCell>
                      : null
                    }
                    {tableActions.map((prop, key) => {
                      return <TableCell className={classes.tableCell}>
                        <Button {...prop.buttonProps} onClick={function () { prop.doAction(obj[idColumn]) }} color={prop.buttonColor ? prop.buttonColor : "primary"}> {prop.buttonText} </Button>
                      </TableCell>
                    })}
                    {tableLink ?
                      <TableCell className={classes.tableCell}>
                        <Link to={tableLink + obj[idColumn]}> <Button color="primary"> Associar Membros </Button> </Link>
                      </TableCell>
                      : null
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        }
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
