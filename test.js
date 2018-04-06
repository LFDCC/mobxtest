import React, { Component } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import { observable, computed, action, configure } from 'mobx'
import { observer } from 'mobx-react'

configure({
    enforceActions: true//使用严格模式
});

@observer
class Test extends Component {
    @observable price = 0;
    @observable count = 0;
    @observable test = 0;
    
    @action
    addPrice() {
        this.price++;
    }
    @action
    subPrice() {
        this.price > 0 && this.price--;
    }
    @action
    addCount() {
        this.count++;
    }
    @action
    subCount() {
        this.count > 0 && this.count--;
    }
    @action
    change(){
        this.test++;
    }
    //computed 只有被检测数据price count 变化是才会重新计算
    @computed get total() {        
        console.log(0)
        return this.price*this.count;
    }
    //method 只要视图重新渲染 就会进入method重新计算（price count test）
    total1() {
        console.log(1)
        return this.price*this.count;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Button title="+" onPress={() => this.addPrice()} style={styles.btn} />
                    <Text>价格：{this.price}</Text>
                    <Button title="-" onPress={() => this.subPrice()} style={styles.btn} />
                </View>
                <View style={styles.item}>
                    <Button title="+" onPress={() => this.addCount()} style={styles.btn} />
                    <Text>数量：{this.count}</Text>
                    <Button title="-" onPress={() => this.subCount()} style={styles.btn} />
                </View>
                <View style={styles.item}>
                    <Text>test：{this.test}</Text>
                    <Button title="测试" onPress={() => this.change()} style={styles.btn} />
                </View>
                <Text>金额：{this.total} </Text>
                <Text>测试：{this.total1()} </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,//铺满父级剩余空间
        justifyContent: 'center',//水平居中
        alignItems: 'center',//上下（垂直）居中
        flexDirection: 'column',//内容元素横向布局，column纵向布局
    },
    item: {
        margin: 15,
        justifyContent: 'center',//水平居中
        flexDirection: 'row',//内容元素横向布局，column纵向布局
        alignItems: 'center',//上下（垂直）居中
    },
    btn: {
        width: 100,
        height: 30
    }
});

export default Test;