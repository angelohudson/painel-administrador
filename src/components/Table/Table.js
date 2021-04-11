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

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { doAction , tableAction, idColumn, tableLink, tableHead, tableData, tableHeaderColor, tableSelectable, tableCheckedIndex, tableSetCheckedIndex } = props;
  
  return (
    <div className={classes.tableResponsive}>
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
              {tableSelectable ? <TableCell className={classes.tableCell + " " + classes.tableHeadCell}> selecione </TableCell> : null }
              {tableAction ? <TableCell className={classes.tableCell + " " + classes.tableHeadCell}> Ações </TableCell> : null}
            </TableRow>
          </TableHead>
        ) : null}
        {
          <TableBody>
            {
              tableData.map((prop, key) => {
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
                    {tableAction ?
                      <TableCell className={classes.tableCell}>
                        <Button onClick={function() {doAction(obj[idColumn])}} color="primary"> Associar Membros </Button>
                      </TableCell>
                      : null
                    }
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
