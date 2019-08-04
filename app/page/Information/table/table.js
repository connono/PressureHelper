import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['日期', '舒张压', '收缩压'],
      widthArr: [110, 90, 90]
    }
  }

  render() {
	const state = this.state
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  this.props.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: 'lightskyblue'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { paddingLeft: 15, paddingTop: 10 ,flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: 'lightskyblue'/*'#F7F6E7'*/ },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'white' }
});