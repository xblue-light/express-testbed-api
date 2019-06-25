import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';
import "./ViolationsTable/ViolationsTable.css";
import Icon from '@material-ui/core/Icon';
import CustomPaginationComponent from '../ViolationsTable/CustomPaginationComponent';
import TextField from '@material-ui/core/TextField';
//import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import matchSorter from 'match-sorter'
import { makeData} from "../../utils/fakeDatabase.js";

// ТОDO: Implement configuration

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      list: [],
      data: makeData(), // Fake data
      violation: [],
      filteredArray: [],
      inputValue: ''
    };
  }

  componentDidMount() {
    this.getListFromAPI();
  }

  getListFromAPI = async () => {
    let res = await axios.get('/api/users/violation');
    let response = await res.data;
    this.setState({ violation: response });
  };
  

  handleInputChange = (event) => {
    this.setState({
      filteredArray: matchSorter(this.state.violation, event.target.value, {keys: ['violationOwner', 'country']}),
      inputValue: event.target.value
    });
  }



  // return matchSorter(this.state.violation, input, {keys: ['violationOwner', 'country']})

  render() {
    return (
      <Container maxWidth="xl">
      <Grid container spacing={3}>

        <Grid item xs={4}>
          <Paper className="xs-3 papperWrapper">
            <form className="violationFilterDateRange" noValidate>
              <TextField
                id="date"
                label=""
                type="date"
                
                defaultValue="2017-05-24"
                className="violationFromDateFilter"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label=""
                type="date"
                defaultValue="2017-05-24"
                className="violationToDateFilter"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className="xs-3 papperWrapper">
          <form>
            <input
              value={this.inputValue}
              type="text"
              onChange={this.handleInputChange}
              placeholder="Enter keyword here..."
            />
          </form>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className="xs-3 papperWrapper">ЕКСПОРТ <Icon style={{fontSize:"15px"}}>file_copy</Icon></Paper>
        </Grid>


        <Grid item xs={12}>
          <h1>Нарушения</h1>

          <Paper>
          <ReactTable
              data={this.state.violation}
              pageText=""

              filterable
              PaginationComponent={CustomPaginationComponent}
              previousText={<Icon>chevron_left</Icon>}
              nextText={<Icon>chevron_right</Icon>}
              defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
              getTdProps={(state, rowInfo, column, row) => {
  
                return {
                  style: {
                    //background: rowInfo.row.status === "Анулиран" ? '#ff6565' : ''
                    // :           rowInfo.row.status === "Приключен" ? '#3163aa'
                    // :           rowInfo.row.status === "Платен" ? '#54b782'
                    // :           rowInfo.row.status === "Отворен" ? '#4c81bc'
                    // :           rowInfo.row.status === "Изпратен" ? '#ff9c1a' : ''
                  }
                }
              }}
              columns={[
                {
                  // Header: () => (
                    
                  // ),
                  columns: [
                    {
                      Header: () => (
                        <span>
                          НАРУШЕНИЕ ID <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "_id",
                      Cell: row => (
                        <div>
                            {
                                //DEBUGGING 
                                //console.log(row.value)
                                
                            }
                            <Link to={"/edit/"+this.state.violation[row.index]._id} className="">{row.value}</Link>
                        </div>
                    ),
                      accessor: d => d._id,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["_id"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          ЧАС/ДАТА <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "createdAt",
                      accessor: d => d.createdAt,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["createdAt"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          ДЪРЖАВА <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "country",
                      accessor: d => d.country,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["country"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          РЕГ. N <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "registrationNumber",
                      accessor: d => d.registrationNumber,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["registrationNumber"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          КАТЕГОРИЯ <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "category",
                      accessor: d => d.category,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["category"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          СОБСТВЕНИК <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "violationOwner",
                      accessor: d => d.violationOwner,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["violationOwner"] }),
                      filterAll: true
                    },
                    {
                      Header: "ТИП ДОКУМЕНТ",
                      id: "typeOfDocument",
                      accessor: d => d.typeOfDocument,
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        if (filter.value === "fysh") {
                          return row[filter.id] === 'ФИШ';
                        }
                        if (filter.value === "fyshFine") {
                          return row[filter.id] === 'ФИШ С ГЛОБА';
                        }
                        if (filter.value === "payan") {
                          return row[filter.id] === 'ПАУАН';
                        }
                        if (filter.value === "ayan") {
                          return row[filter.id] === 'АУАН';
                        }
                        if (filter.value === "np") {
                          return row[filter.id] === 'НП';
                        }
                        return true;
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option valie="all">Всички</option>
                          <option value="fysh">ФИШ</option>
                          <option value="fyshFine">ФИШ С ГЛОБА</option>
                          <option value="payan">ПАУАН</option>
                          <option value="ayan">АУАН</option>
                          <option value="np">НП</option>
                        </select>
                    },
                    {
                      Header: "СТАТУС",
                      id: "status",
                      accessor: d => d.status,
                      filterMethod: (filter, row) => {
                        if (filter.value === "open") {
                          
                          return row[filter.id] === 'Отворен';
                        }
                        if (filter.value === "sent") {
                          return row[filter.id] === 'Изпратен';
                        }
                        if (filter.value === "reset") {
                          return row[filter.id] === 'Анулиран';
                        }
                        if (filter.value === "paid") {
                          return row[filter.id] === 'Платен';
                        }
                        if (filter.value === "done") {
                          return row[filter.id] === 'Приключен';
                        }
                        return true;
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">Всички</option>
                          <option value="open">Отворен</option>
                          <option value="sent">Изпратен</option>
                          <option value="reset">Анулиран</option>
                          <option value="paid">Платен</option>
                          <option value="done">Приключен</option>
                        </select>
                    },
                    {
                      Header: () => (
                        <span>
                          СЪСТАВИТЕЛ <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "issuedBy",
                      accessor: d => d.issuedBy,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["issuedBy"] }),
                      filterAll: true
                    },
                    {
                      Header: () => (
                        <span>
                          ПОСЛ. РЕДАКТИРАЛ <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "updatedAt",
                      accessor: d => d.updatedAt,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["updatedAt"] }),
                      filterAll: true
                    },
                    // *********************************************************
                    // TODO: 
                    // Час/дата на редакция.. формат ДД.ММ.ГГ 15:49 (БЕЗ ФИЛТЪР)
                  ]
                },
              ]}
              defaultPageSize={10} 
              className="-highlight violationsTableWrapper"

            />
          </Paper>
        </Grid>
      </Grid>
      

    </Container>
    );
  }
}