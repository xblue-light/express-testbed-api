import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';
import "./ViolationsTable.css";
import Icon from '@material-ui/core/Icon';
import CustomPaginationComponent from "./CustomPaginationComponent"
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import matchSorter from 'match-sorter';
import { makeData} from "../../utils/fakeDatabase";
import AlphaDatePicker from './AlphaDatePicker'

// ТОDO: Implement configuration

export default class Index extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      list: [],
      date: new Date(),
      data: makeData(), // Fake JSON data array
      violations: [],
      filteredViolations: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }


  async axiosGETRequest(){
    let res = await axios.get('/api/users/violation');
    let response = await res.data;
    this.setState({ 
      violations: response, 
      filteredViolations: response 
    });
  }

  handleInputChange(event){
    this.setState({
      filteredViolations: matchSorter(this.state.violations, event.target.value, {keys: ['violationOwner', 'country']})
    });
  }

  handleDate(dateValue){
    console.log(dateValue);

    this.setState({
      date: dateValue
    })
  }


  componentDidMount(){
    this.axiosGETRequest();
  }

  render() {
    return (
      
      <Container maxWidth="xl">
        <div className="container-fluid heading-violations">
          <div className="row">
            <div className="col-xs-12 col-md-8"><h2>Нарушения</h2></div>
            <div className="col-xs-12 col-md-4"><button className="btn btn-primary btn-newviolation">Въведи нарушение</button></div>
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>

            <AlphaDatePicker handleDateProps={this.handleDate} defaultDate={this.state.date} />

          </Grid>
          <Grid item xs={12} md={4}>
          <Input
                type="text"
                style={{width: "270px", marginTop: '16px'}}
                className="customSearchInput"
                onChange={this.handleInputChange}
                placeholder="Търсене в документа"
              />
              <Icon className="searchIcon">search</Icon>
          </Grid>
          <Grid item xs={12} md={4}>
          <Paper className="xs-3 papperWrapper">
                <a onClick={() => alert("Exporting some data...")} 
                   className="exportBtn" href="#!">ЕКСПОРТ <Icon style={{fontSize:"13px", position: "relative", top: "1px", marginTop: '16px'}}>file_copy</Icon>
                </a>
              </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <ReactTable
                  data={this.state.filteredViolations}
                  pageText=""
                  filterable
                  PaginationComponent={CustomPaginationComponent}
                  previousText={<Icon>chevron_left</Icon>}
                  nextText={<Icon>chevron_right</Icon>}
                  defaultPageSize={5} 
                  className="-highlight violationsTableWrapper"
                  defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                  getTdProps={(state, rowInfo, column, row) => {
                    return {
                      style: {
                        //background: rowInfo.row.status === "Анулиран" ? '#ff6565' : ''
                      }
                    }
                  }}
                  columns={[
                    // #1
                    {
                      Header: () => (
                        <span>
                          НАРУШЕНИЕ ID <Icon className="upwardArrow">arrow_upward</Icon>
                        </span>
                      ),
                      id: "_id",
                      Cell: row => (
                        <div>
                            {/* {console.log(row.value)} */}
                            <Link to={"/edit/"+this.state.violations[row.index]._id} className="">{row.value}</Link>
                        </div>
                    ),
                      accessor: d => d._id,
                      filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["_id"] }),
                      filterAll: true
                    },
                    // #2
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
                    // #3
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
                    // #4
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
                    // #5
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
                    // #6
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
                    // #7
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
                    // #8
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
                    // #9
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
                    // #10
                    {
                      Header: () => (
                        <span>
                          ДАТА НА РЕДАКЦИЯ <Icon className="upwardArrow">arrow_upward</Icon>
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
                  ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}