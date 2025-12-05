/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from 'react-table'

import {
  fetchGetAllRecords,
  fetchDeleteRecord,
  fetchUpdateRecord,
} from '../../redux/slices/recordsSlice'

import NoRecords from './NoRecords'

const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  const onBlur = () => {
    setIsEditing(false)
    updateRecord(row.index, column.id, value)
  }

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? 'pointer' : 'default' }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: '100%' }}
        />
      ) : typeof value === 'string' ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  )
}

const RecordList = () => {
  const dispatch = useDispatch()
  const records = useSelector((state) => state.records.recordsList)


  const updateRecord = (id, updatedRecord) => {
    const payloadObj = {
      idRecord: id,
      updatedRecord,
    }
    dispatch(fetchUpdateRecord(payloadObj))
  }
  const deleteRecord = (id) => {
    dispatch(fetchDeleteRecord(id))
  }
  // const getRecords = () => {
  //   dispatch(fetchGetAllRecords())
  // }

  useEffect(() => {
    dispatch(fetchGetAllRecords())
  }, [])

  // useEffect(() => {
  //   if (records.length > 0 && user) {
  //     dispatch(fetchGetAllRecords())
  //   }
  // }, [records, user])

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]?._id
    const newObj = {
      ...records[rowIndex],
      [columnId]: value,
    }
    if (newObj._id) {
      updateRecord(id ?? '', newObj)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Описание',
        accessor: 'description',
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: 'Сумма',
        accessor: 'amount',
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: 'Категория',
        accessor: 'category',
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: 'Метод оплаты',
        accessor: 'paymentMethod',
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: 'Дата',
        accessor: 'date',
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: 'Удалить',
        id: 'delete',
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? '')}
            className="button"
          >
            удалить
          </button>
        ),
      },
    ],
    [records]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: records || [],
  })

  if (!records || records.length === 0) {
    return <NoRecords />
  }

  return (
    <div className="table-container">
      {records.length > 0 && (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups?.map((hg, inx) => (
              <tr {...hg.getHeaderGroupProps()} key={inx}>
                {hg.headers.map((column, inx) => (
                  <th {...column.getHeaderProps()} key={inx}>
                    {' '}
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.map((row, inx) => {
              prepareRow(row)
              return (
                <tr {...row?.getRowProps()} key={inx}>
                  {row.cells.map((cell, inx) => (
                    <td {...cell.getCellProps()} key={inx}>
                      {' '}
                      {cell.render('Cell')}{' '}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {/* <button onClick={getRecords}>TEST</button> */}
    </div>
  )
}

export default RecordList
